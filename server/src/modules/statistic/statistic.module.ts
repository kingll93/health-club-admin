import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { ConsumerModule } from '../consumer/consumer.module';
import { ConsumptionRecordModule } from '../consumption-record/consumption-record.module';
import { RechargeRecordModule } from '../recharge-record/recharge-record.module';

@Module({
  imports: [TypeOrmModule.forFeature(), ConsumerModule, ConsumptionRecordModule, RechargeRecordModule],
  controllers: [StatisticController],
  providers: [StatisticService]
})
export class StatisticModule {}
