import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer'

import { ConsumerEntity } from './entities/consumer.entity';
import { CreateConsumerDto } from './dto/create-consumer.dto';
// import { UpdateConsumerDto } from './dto/update-consumer.dto';

export interface ConsumersRo {
  list: ConsumerEntity[];
  count: number;
}

@Injectable()
export class ConsumerService {
  constructor(
    @InjectRepository(ConsumerEntity)
    private readonly consumerRepository: Repository<ConsumerEntity>
  ) {}

  async create(dto: CreateConsumerDto): Promise<ConsumerEntity> {
    const { name } = dto;
    if (!name) {
      throw new HttpException('顾客姓名不能为空', 400);
    }
    const result = await this.consumerRepository.findOne({ where: { name } });
    if (result) {
      throw new HttpException('顾客已存在', 400);
    }
    const consumer = plainToInstance(ConsumerEntity, dto)
    return await this.consumerRepository.save(consumer);
  }

  async findAll(query): Promise<ConsumersRo> {
    const qb = await this.consumerRepository.createQueryBuilder();
    qb.where('1 = 1');
    qb.orderBy('create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const consumers = await qb.getMany();
    return { list: consumers, count: count };
  }

  async findOne(id: number) {
    return await this.consumerRepository.findOne({
      where: {
        id
      }
    });
  }
}
