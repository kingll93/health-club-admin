import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ConsumerService } from './consumer.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { FindConsumerDto } from './dto/find-consumer.dto';

@ApiTags('客户')
@Controller('consumer')
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @ApiOperation({ summary: '新增客户' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createConsumerDto: CreateConsumerDto) {
    return this.consumerService.create(createConsumerDto);
  }

  @ApiOperation({ summary: '客户列表' })
  @ApiBearerAuth()
  @Get()
  findAll(
    @Query() findConsumerDto: FindConsumerDto
  ) {
    return this.consumerService.findAll(findConsumerDto);
  }

  @ApiOperation({ summary: '客户详情' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.consumerService.findOne(id);
  }

  @ApiOperation({ summary: '更新客户信息' })
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateConsumerDto: UpdateConsumerDto,
  ) {
    return this.consumerService.update(id, updateConsumerDto);
  }

  @ApiOperation({ summary: '删除客户' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.consumerService.remove(id);
  }
}
