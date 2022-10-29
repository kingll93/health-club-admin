import { PartialType } from '@nestjs/swagger';
import { CreateRechargeRecordDto } from './create-recharge-record.dto';

export class UpdateRechargeRecordDto extends PartialType(CreateRechargeRecordDto) {}
