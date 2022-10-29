import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as dayjs from 'dayjs';
import { ConsumerService } from '../consumer/consumer.service';
import { RechargeRecord } from './entities/recharge-record.entity';
import { User } from '../user/entities/user.entity';
import { Balance } from '../balance/entities/balance.entity';
import { CreateRechargeRecordDto } from './dto/create-recharge-record.dto';
import { UpdateRechargeRecordDto } from './dto/update-recharge-record.dto';
import { FindRechargeRecordDto } from './dto/find-recharge-record.dto';
import { RechargeRecordRo } from './dto/recharge-record-info.dto';
import { BalanceType } from 'src/core/enums/common.enum';

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
    const consumer = await this.consumerService.findOne(consumerId);
    if (!consumer) {
      throw new NotFoundException(`id为${consumerId}的客户不存在`);
    }
    consumer.balance += amount;

    const rechargeRecord = this.rechargeRecordRepository.create({
      orderNum,
      createBy: user.id,
      ...createRechargeRecordDto
    });

    const balance = this.dataSource.getRepository(Balance).create({
      orderNum,
      consumerId: consumer.id,
      type: BalanceType.RECHARGE,
      balance: consumer.balance,
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(consumer);
      await queryRunner.manager.save(rechargeRecord);
      await queryRunner.manager.save(balance);

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(dto: FindRechargeRecordDto): Promise<RechargeRecordRo> {
    const {
      page = 1,
      pageSize = 10,
      userName,
      consumerName,
      startTime = '',
      endTime = dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    } = dto;
    const total = Number(
      (
        await this.dataSource.query(`
      select
        count(*) count
      from recharge_record rr
      left join consumers c on rr.consumer_id = c.id
      left join user u on rr.create_by = u.id
      where c.name like '%${consumerName || ''}%' and u.name like '%${
          userName || ''
        }%' and rr.create_time between '${startTime}' and '${endTime}'
    `)
      )[0].count,
    );

    const list = await this.dataSource.query(`
      select
        rr.id,
        rr.amount,
        rr.order_num orderNum,
        rr.remark,
        date_format(rr.create_time,'%Y-%m-%d %H:%i:%s') as createTime,
        c.name as consumerName,
        u.name as userName,
        b.balance
      from recharge_record as rr
      left join consumers as c on rr.consumer_id = c.id
      left join user as u on rr.create_by = u.id
      left join balance b on rr.order_num = b.order_num
      where c.name like '%${consumerName || ''}%' and u.name like '%${
      userName || ''
    }%' and rr.create_time between '${startTime}' and '${endTime}'
      order by rr.create_time DESC
      limit ${pageSize}
      offset ${pageSize * (page - 1)}
    `);
    return { list, total };
  }

  async findOne(id: number) {}

  update(id: number, updateRechargeRecordDto: UpdateRechargeRecordDto) {
    return `This action updates a #${id} rechargeRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} rechargeRecord`;
  }
}
