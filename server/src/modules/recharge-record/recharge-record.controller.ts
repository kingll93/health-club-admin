import { Controller, Get, Post, Body, Query, Patch, Param, Delete, Req} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RechargeRecordService } from './recharge-record.service';
import { CreateRechargeRecordDto } from './dto/create-recharge-record.dto';
import { UpdateRechargeRecordDto } from './dto/update-recharge-record.dto';
import { FindRechargeRecordDto } from './dto/find-recharge-record.dto';
import { RechargeRecordRo } from './dto/recharge-record-info.dto';


@ApiTags('充值记录')
@Controller('recharge-record')
export class RechargeRecordController {
  constructor(private readonly rechargeRecordService: RechargeRecordService) {}

  @ApiOperation({ summary: '新增充值记录' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createRechargeRecordDto: CreateRechargeRecordDto, @Req() req) {
    return this.rechargeRecordService.create(req.user, createRechargeRecordDto);
  }

  @ApiOperation({ summary: '充值记录列表' })
  @ApiBearerAuth()
  @Get()
  findAll(@Query() dto: FindRechargeRecordDto): Promise<RechargeRecordRo> {
    return this.rechargeRecordService.findAll(dto);
  }

  @ApiOperation({ summary: '根据id查询充值记录' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rechargeRecordService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRechargeRecordDto: UpdateRechargeRecordDto) {
  //   return this.rechargeRecordService.update(+id, updateRechargeRecordDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rechargeRecordService.remove(+id);
  }
}
