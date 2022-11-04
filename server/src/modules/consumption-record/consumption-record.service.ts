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
import { User } from 'src/modules/user/entities/user.entity';
import { Balance } from '../balance/entities/balance.entity';
import { ConsumerService } from 'src/modules/consumer/consumer.service';
import { CreateConsumptionRecordDto } from './dto/create-consumption-record.dto';
import { UpdateConsumptionRecordDto } from './dto/update-consumption-record.dto';
import { FindConsumptionRecordDto } from './dto/find-consumption-record.dto';
import { BalanceType, ConsumptionType, HairType } from 'src/core/enums/common.enum';


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
      delete dto.hairType
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
      console.log(err);
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
      consumerName,
      userName,
      startTime = '',
      endTime = dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    } = dto;
    const total = Number(
      (
        await this.dataSource.query(`
      select
        count(*) count
      from consumption_record cr
      left join consumers c on cr.consumer_id = c.id
      left join user u on cr.create_by = u.id
      where c.name like '%${consumerName || ''}%' and u.name like '%${
          userName || ''
        }%' and cr.create_time between '${startTime}' and '${endTime}'
    `)
      )[0].count,
    );

    const list = await this.dataSource.query(`
      select 
        cr.id,
        cr.order_num orderNum,
        cr.consumption_type consumptionType,
        cr.hair_type hairType,
        cr.amount,
        cr.remark,
        date_format(cr.create_time,'%Y-%m-%d %H:%i:%s') as createTime,
        c.name consumerName,
        u.name userName,
        b.balance
      from consumption_record cr
      left join consumers c on cr.consumer_id = c.id
      left join user u on cr.create_by = u.id
      left join balance b on cr.order_num = b.order_num
      where c.name like '%${consumerName || ''}%' and u.name like '%${
      userName || ''
    }%' and cr.create_time between '${startTime}' and '${endTime}'
      order by cr.create_time DESC
      limit ${pageSize}
      offset ${pageSize * (page - 1)}
    `);

    return { list, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} consumptionRecord`;
  }

  async getCountAndAmount() {
    const count = await this.consumptionRecordRepository.count();
    const amount = (await this.consumptionRecordRepository.createQueryBuilder().select('sum(amount)', 'sum').getRawOne()).sum
    return {
      count,
      amount
    }
  }

  // update(id: number, updateConsumptionRecordDto: UpdateConsumptionRecordDto) {
  //   return `This action updates a #${id} consumptionRecord`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} consumptionRecord`;
  // }
}
