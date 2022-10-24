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
import { ConsumerService } from 'src/modules/consumer/consumer.service';
import { CreateConsumptionRecordDto } from './dto/create-consumption-record.dto';
import { UpdateConsumptionRecordDto } from './dto/update-consumption-record.dto';
import { FindConsumptionRecordDto } from './dto/find-consumption-record.dto';

@Injectable()
export class ConsumptionRecordService {
  constructor(
    @InjectRepository(ConsumptionRecord)
    private readonly consumptionRecordRepository: Repository<ConsumptionRecord>,
    private readonly consumerService: ConsumerService,
    private readonly dataSource: DataSource,
  ) {}

  async create(user: User, dto: CreateConsumptionRecordDto) {
    const { consumerId, amount } = dto;
    const consumer = await this.consumerService.findOne(consumerId);
    if (!consumer) {
      throw new NotFoundException(`id为${consumerId}的客户不存在`);
    }
    if (amount > consumer.balance) {
      throw new BadRequestException('客户余额不足');
    }
    consumer.balance = consumer.balance - amount;
    const consumptionRecord: Partial<ConsumptionRecord> = {
      createBy: user.id,
      ...dto
    };

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(consumer);
      await queryRunner.manager.save(
        this.consumptionRecordRepository.create(consumptionRecord),
      );

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
    const { page = 1, pageSize = 10, consumerName, userName, startTime='', endTime=dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss') } = dto;
    const total = Number((await this.dataSource.query(`
      select
        count(*) count
      from consumption_record cr
      left join consumers c on cr.consumer_id = c.id
      left join user u on cr.create_by = u.id
      where c.name like '%${consumerName || ''}%' and u.name like '%${userName || ''}%' and cr.create_time between '${startTime}' and '${endTime}'
    `))[0].count);

    const list = await this.dataSource.query(`
      select 
        cr.*,
        c.name consumerName,
        u.name userName,
        date_format(cr.create_time,'%Y-%m-%d %H:%i:%s') as createTime
      from consumption_record cr
      left join consumers c on cr.consumer_id = c.id
      left join user u on cr.create_by = u.id
      where c.name like '%${consumerName || ''}%' and u.name like '%${userName || ''}%' and cr.create_time between '${startTime}' and '${endTime}'
      order by cr.create_time DESC
      limit ${pageSize}
      offset ${pageSize * (page - 1)}
    `);

    return  { list, total }
  }

  findOne(id: number) {
    return `This action returns a #${id} consumptionRecord`;
  }

  // update(id: number, updateConsumptionRecordDto: UpdateConsumptionRecordDto) {
  //   return `This action updates a #${id} consumptionRecord`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} consumptionRecord`;
  // }
}
