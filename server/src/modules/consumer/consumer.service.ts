/*
 * @Author: wll
 * @Date: 2022-10-29 14:14:53
 * @LastEditors: wll
 * @LastEditTime: 2022-10-29 15:50:40
 * @Description: 
 */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import * as dayjs from 'dayjs';

import { Consumer } from './entities/consumer.entity';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { FindConsumerDto } from './dto/find-consumer.dto';


@Injectable()
export class ConsumerService {
  constructor(
    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>
  ) {}

  async create(dto: CreateConsumerDto): Promise<Consumer> { 
    let { phone, cardNum, balance } = dto;
    let result = await this.consumerRepository.findOne({ where: { cardNum } });
    if (result) {
      throw new ConflictException(`会员号'${cardNum}'已存在`);
    }
    result = await this.consumerRepository.findOne({ where: { phone } });
    if (result) {
      throw new ConflictException(`手机号'${phone}'已存在`);
    }
    if (typeof balance !== 'number' || balance < 0) {
      balance = 0;
    }
    const consumer = await this.consumerRepository.create({
      ...dto,
      balance
    })
    return await this.consumerRepository.save(consumer);
  }

  async findAll(dto: FindConsumerDto): Promise<any> {
    const { page=1, pageSize=10, name, phone, gender, startTime='', endTime=dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss') } = dto;
    const where = {
      ...!!name ? { name: Like(`%${name}%`) } : null,
      ...!!phone? { phone: Like(`%${phone}%`) } : null,
      ...!!gender ? { gender } : null,
      ...{ createTime: Between(startTime, endTime) },
    }
    const consumers = await this.consumerRepository.findAndCount({ where, order: { cardNum: 'DESC' }, skip: pageSize * (page - 1), take: pageSize })
    consumers[0] = consumers[0].map(consumer => consumer.toResponseData());
    return  { list: consumers[0], total: consumers[1] }
  }

  async findOne(id: number) {
    return await this.consumerRepository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, dto: UpdateConsumerDto) {
    const exist = await this.consumerRepository.findOne({where: {id}});
    if (!exist) {
      throw new NotFoundException(`id为${id}的客户不存在`);
    }

    if ((exist.phone !== dto.phone) && (await this.consumerRepository.findOne({where: {phone: dto.phone}}))) {
      throw new ConflictException(`手机号'${dto.phone}'已存在`);
    }

    const updateConsumer = this.consumerRepository.merge(exist, dto);
    return await this.consumerRepository.save(updateConsumer);
  }

  async remove(id: number) {
    const exist = await this.consumerRepository.findOne({where: {id}});
    if (!exist) {
      throw new NotFoundException(`id为${id}的客户不存在`);
    }
    return await this.consumerRepository.remove(exist);
  }

  async getAllBalance() {
    const res = await this.consumerRepository.createQueryBuilder().select('sum(balance)', 'sum').getRawOne();
    return res.sum;
  }
}
