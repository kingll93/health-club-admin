import { PartialType } from '@nestjs/swagger';
import { CreateConsumptionRecordDto } from './create-consumption-record.dto';

export class UpdateConsumptionRecordDto extends PartialType(CreateConsumptionRecordDto) {}
