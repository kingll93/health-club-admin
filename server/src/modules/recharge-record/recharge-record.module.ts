import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RechargeRecordService } from './recharge-record.service';
import { RechargeRecordController } from './recharge-record.controller';
import { RechargeRecord } from './entities/recharge-record.entity';
import { ConsumerModule } from '../consumer/consumer.module';

@Module({
  imports: [TypeOrmModule.forFeature([RechargeRecord]), ConsumerModule],
  controllers: [RechargeRecordController],
  providers: [RechargeRecordService]
})
export class RechargeRecordModule {}
