import {
  Injectable,
  HttpException,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as dayjs from 'dayjs';
import { ConsumerService } from '../consumer/consumer.service';
import { RechargeRecord } from './entities/recharge-record.entity';
import { User } from '../user/entities/user.entity';
import { Balance } from '../balance/entities/balance.entity';
import { Consumer } from '../consumer/entities/consumer.entity';
import { CreateRechargeRecordDto } from './dto/create-recharge-record.dto';
import { UpdateRechargeRecordDto } from './dto/update-recharge-record.dto';
import { FindRechargeRecordDto } from './dto/find-recharge-record.dto';
import { BalanceType, IsDeleted } from 'src/core/enums/common.enum';
import logger from 'src/log/logger';

@Injectable()
export class RechargeRecordService {
  constructor(
    @InjectRepository(RechargeRecord)
    private readonly rechargeRecordRepository: Repository<RechargeRecord>,
    private readonly consumerService: ConsumerService,
    private readonly dataSource: DataSource,
  ) {}

  async create(user: User, createRechargeRecordDto: CreateRechargeRecordDto) {
    const orderNum = 'PRE' + dayjs().format('YYYYMMDDHHmmssSSS');

    const { consumerId, amount } = createRechargeRecordDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const consumer = await queryRunner.manager.findOne(Consumer, {
        where: { id: consumerId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!consumer) {
        throw new NotFoundException(`id为${consumerId}的客户不存在`);
      }

      consumer.balance += amount;

      const rechargeRecord = this.rechargeRecordRepository.create({
        orderNum,
        createBy: user.id,
        ...createRechargeRecordDto,
      });

      const balance = this.dataSource.getRepository(Balance).create({
        orderNum,
        consumerId: consumer.id,
        type: BalanceType.RECHARGE,
        balance: consumer.balance,
      });

      await queryRunner.manager.save(consumer);
      await queryRunner.manager.save(rechargeRecord);
      await queryRunner.manager.save(balance);

      await queryRunner.commitTransaction();
    } catch (err) {
      logger.error(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(dto: FindRechargeRecordDto) {
    const {
      page = 1,
      pageSize = 10,
      userName = '',
      consumerName = '',
      startTime = '',
      endTime = dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    } = dto;

    const qb = this.rechargeRecordRepository
      .createQueryBuilder('rechargeRecord')
      .leftJoinAndSelect(
        Consumer,
        'consumer',
        'consumer.id = rechargeRecord.consumerId',
      )
      .leftJoinAndSelect(User, 'user', 'user.id = rechargeRecord.createBy')
      .leftJoinAndSelect(
        Balance,
        'balance',
        'balance.orderNum = rechargeRecord.orderNum',
      )
      .select(
        `
      rechargeRecord.id,
      rechargeRecord.amount,
      rechargeRecord.remark,
      rechargeRecord.orderNum as orderNum,
      DATE_FORMAT(rechargeRecord.createTime,'%Y-%m-%d %H:%i:%s') as createTime,
      consumer.name as consumerName,
      user.name as userName,
      balance.balance
    `,
      )
      .where('rechargeRecord.isDeleted = :isDeleted', {
        isDeleted: IsDeleted.NO,
      })
      .andWhere('consumer.isDeleted = :isDeleted', { isDeleted: IsDeleted.NO })
      .andWhere('consumer.name LIKE :consumerName', {
        consumerName: `%${consumerName}%`,
      })
      .andWhere('user.name LIKE :userName', { userName: `%${userName}%` })
      .andWhere('rechargeRecord.createTime Between :startTime and :endTime', {
        startTime,
        endTime,
      })
      .orderBy('rechargeRecord.createTime', 'DESC')
      .offset(pageSize * (page - 1))
      .limit(pageSize);

    return {
      list: await qb.getRawMany(),
      total: await qb.getCount(),
    };
  }

  async findOne(id: number) {}

  update(id: number, updateRechargeRecordDto: UpdateRechargeRecordDto) {
    return `This action updates a #${id} rechargeRecord`;
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const record = await queryRunner.manager.findOneBy(RechargeRecord, {
        id,
      });
      if (!record) {
        throw new NotFoundException(`id为${id}的充值订单不存在`);
      }

      if (
        dayjs(record.createTime).format('YYYY-MM-DD') !==
        dayjs().format('YYYY-MM-DD')
      ) {
        throw new BadRequestException('只能删除当天的订单');
      }

      const balanceRecord = await queryRunner.manager.findOneBy(Balance, {
        orderNum: record.orderNum,
      });

      const consumer = await queryRunner.manager.findOne(Consumer, {
        where: { id: record.consumerId },
        lock: { mode: 'pessimistic_write' }, // 🔒加悲观锁
      });

      if (!consumer) {
        throw new NotFoundException(`id为${record.consumerId}的客户不存在`);
      }

      // 回滚余额 + 标记删除
      record.isDeleted = IsDeleted.YES;
      balanceRecord.isDeleted = IsDeleted.YES;
      consumer.balance -= record.amount;

      // 顺序保存
      await queryRunner.manager.save(balanceRecord);
      await queryRunner.manager.save(consumer);
      const result = await queryRunner.manager.save(record);

      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error(err);
      throw err instanceof HttpException
        ? err
        : new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
}
