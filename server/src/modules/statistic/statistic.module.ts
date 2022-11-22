import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [StatisticController],
  providers: [StatisticService]
})
export class StatisticModule {}
