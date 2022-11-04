import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StatisticService } from './statistic.service';

@ApiTags('数据统计')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @ApiOperation({ summary: '基础数据统计' })
  @ApiBearerAuth()
  @Get('base')
  getStatistic() {
    return this.statisticService.getStatistic();
  }

  @ApiOperation({ summary: '每日消费统计' })
  @ApiBearerAuth()
  @Get('daily-consumption')
  dailyConsumption() {
    return this.statisticService.dailyConsumption();
  }

  @ApiOperation({ summary: '消费类别统计' })
  @ApiBearerAuth()
  @Get('consumption-category')
  consumptionCategory() {
    return this.statisticService.consumptionCategory();
  }
}
