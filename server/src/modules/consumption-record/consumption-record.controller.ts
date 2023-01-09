import { Controller, Get, Post, Body, Query, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ConsumptionRecordService } from './consumption-record.service';
import { CreateConsumptionRecordDto } from './dto/create-consumption-record.dto';
import { UpdateConsumptionRecordDto } from './dto/update-consumption-record.dto';
import { FindConsumptionRecordDto } from './dto/find-consumption-record.dto';

@ApiTags('消费记录')
@Controller('consumption-record')
export class ConsumptionRecordController {
  constructor(private readonly consumptionRecordService: ConsumptionRecordService) {}

  @ApiOperation({ summary: '新增消费记录' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createConsumptionRecordDto: CreateConsumptionRecordDto, @Req() req) {
    return this.consumptionRecordService.create(req.user, createConsumptionRecordDto);
  }

  @ApiOperation({ summary: '消费记录列表' })
  @ApiBearerAuth()
  @Get()
  findAll(@Query() dto: FindConsumptionRecordDto) {
    return this.consumptionRecordService.findAll(dto);
  }

  @ApiOperation({ summary: '根据id查询消费记录' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumptionRecordService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateConsumptionRecordDto: UpdateConsumptionRecordDto) {
  //   return this.consumptionRecordService.update(+id, updateConsumptionRecordDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumptionRecordService.remove(+id);
  }
}
