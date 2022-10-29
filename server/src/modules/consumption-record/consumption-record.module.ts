import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumptionRecordService } from './consumption-record.service';
import { ConsumptionRecordController } from './consumption-record.controller';
import { ConsumptionRecord } from './entities/consumption-record.entity';
import { ConsumerModule } from 'src/modules/consumer/consumer.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionRecord]), ConsumerModule],
  controllers: [ConsumptionRecordController],
  providers: [ConsumptionRecordService]
})
export class ConsumptionRecordModule {}
