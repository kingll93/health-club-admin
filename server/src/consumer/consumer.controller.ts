/*
 * @Author: wll
 * @Date: 2022-10-14 21:23:50
 * @LastEditors: wll
 * @LastEditTime: 2022-10-16 17:22:09
 * @Description: 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ConsumerService } from './consumer.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';

@ApiTags('客户')
@Controller('consumer')
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @ApiOperation({ summary: '新增客户' })
  @Post()
  create(@Body() createConsumerDto: CreateConsumerDto) {
    return this.consumerService.create(createConsumerDto);
  }

  @ApiOperation({ summary: '获取客户列表' })
  @Get()
  findAll() {
    return this.consumerService.findAll({});
  }

  @ApiOperation({ summary: '获取客户详情' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumerService.findOne(+id);
  }

  @ApiOperation({ summary: '更新客户信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumerDto: UpdateConsumerDto) {
    return this.consumerService.update(+id, updateConsumerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumerService.remove(+id);
  }
}
