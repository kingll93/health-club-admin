import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, Like } from 'typeorm';
import * as dayjs from 'dayjs';
import { ConsumptionRecord } from './entities/consumption-record.entity';
import { Consumer } from '../consumer/entities/consumer.entity';
import { User } from '../user/entities/user.entity';
import { Balance } from '../balance/entities/balance.entity';
import { ConsumerService } from 'src/modules/consumer/consumer.service';
import { CreateConsumptionRecordDto } from './dto/create-consumption-record.dto';
import { UpdateConsumptionRecordDto } from './dto/update-consumption-record.dto';
import { FindConsumptionRecordDto } from './dto/find-consumption-record.dto';
import {
  BalanceType,
  ConsumptionType,
  HairType,
  IsDeleted,
} from 'src/core/enums/common.enum';
import logger from 'src/log/logger';

@Injectable()
export class ConsumptionRecordService {
  constructor(
    @InjectRepository(ConsumptionRecord)
    private readonly consumptionRecordRepository: Repository<ConsumptionRecord>,
    private readonly consumerService: ConsumerService,
    private readonly dataSource: DataSource,
  ) {}

  async create(user: User, dto: CreateConsumptionRecordDto) {
    const orderNum = 'CON' + dayjs().format('YYYYMMDDHHmmssSSS');

    const { consumerId, amount } = dto;

    const consumer = await this.consumerService.findOne(consumerId);
    if (!consumer) {
      throw new NotFoundException(`id为${consumerId}的客户不存在`);
    }
    if (amount > consumer.balance) {
      throw new BadRequestException('客户余额不足');
    }
    consumer.balance = consumer.balance - amount;
    if (dto.consumptionType == ConsumptionType.OTHER) {
      delete dto.hairType;
    }

    const consumptionRecord = this.consumptionRecordRepository.create({
      orderNum,
      createBy: user.id,
      ...dto,
    });

    const balance = this.dataSource.getRepository(Balance).create({
      orderNum,
      consumerId: consumer.id,
      type: BalanceType.CONSUMEPTION,
      balance: consumer.balance,
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(consumer);
      await queryRunner.manager.save(consumptionRecord);
      await queryRunner.manager.save(balance);

      await queryRunner.commitTransaction();
    } catch (err) {
      logger.error(err);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(dto: FindConsumptionRecordDto): Promise<any> {
    const {
      page = 1,
      pageSize = 10,
      consumerName = '',
      userName = '',
      startTime = '',
      endTime = dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    } = dto;

    const qb = this.consumptionRecordRepository.createQueryBuilder('consumptionRecord')
    .leftJoinAndSelect(Consumer, 'consumer', 'consumer.id = consumptionRecord.consumerId')
    .leftJoinAndSelect(User, 'user', 'user.id = consumptionRecord.createBy')
    .leftJoinAndSelect(Balance, 'balance', 'balance.orderNum = consumptionRecord.orderNum')
    .select(`
      consumptionRecord.id,
      consumptionRecord.amount,
      consumptionRecord.remark,
      consumptionRecord.consumptionType as consumptionType,
      consumptionRecord.hairType as hairType,
      consumptionRecord.orderNum as orderNum,
      DATE_FORMAT(consumptionRecord.createTime,'%Y-%m-%d %H:%i:%s') as createTime,
      consumer.name as consumerName,
      user.name as userName,
      balance.balance
    `)
    .where('consumptionRecord.isDeleted = :isDeleted', { isDeleted: IsDeleted.NO})
    .andWhere('consumer.isDeleted = :isDeleted', { isDeleted: IsDeleted.NO })
    .andWhere('consumer.name LIKE :consumerName', { consumerName: `%${consumerName}%` })
    .andWhere('user.name LIKE :userName', { userName: `%${userName}%` })
    .andWhere('consumptionRecord.createTime Between :startTime and :endTime', { startTime, endTime })
    .orderBy('consumptionRecord.createTime', 'DESC')
    .offset(pageSize * (page - 1))
    .limit(pageSize)
    
    return { 
      list: await qb.getRawMany(),
      total: await qb.getCount()
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} consumptionRecord`;
  }

  // update(id: number, updateConsumptionRecordDto: UpdateConsumptionRecordDto) {
  //   return `This action updates a #${id} consumptionRecord`;
  // }

  async remove(id: number) {
    const record = await this.consumptionRecordRepository.findOneBy({id});
    if (!record) {
      throw new NotFoundException(`id为${id}的消费订单不存在`);
    }
    
    if (dayjs(record.createTime).format('YYYY-MM-DD') !== dayjs().format('YYYY-MM-DD')) {
      throw new BadRequestException('只能删除当天的订单')
    }

    const balanceRecord = await this.dataSource.getRepository(Balance).findOneBy({orderNum: record.orderNum});

    record.isDeleted = IsDeleted.YES;
    balanceRecord.isDeleted = IsDeleted.YES;

    const consumer = await this.consumerService.findOne(record.consumerId);
    consumer.balance += record.amount;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let result = null;
    try {
      await queryRunner.manager.save(balanceRecord);
      await queryRunner.manager.save(consumer);
      result = await queryRunner.manager.save(record);

      await queryRunner.commitTransaction();
    } catch (err) {
      logger.error(err);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
    return result;
  }
}
