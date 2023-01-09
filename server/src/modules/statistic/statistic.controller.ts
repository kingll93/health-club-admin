import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StatisticDto } from './dto/statistic.dto';
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

  @ApiOperation({ summary: '当日数据统计' })
  @ApiBearerAuth()
  @Get('today')
  getTodayStatistic() {
    return this.statisticService.getTodayStatistic();
  }

  @ApiOperation({ summary: '每日消费统计' })
  @ApiBearerAuth()
  @Get('daily-consumption')
  dailyConsumption() {
    return this.statisticService.dailyConsumption();
  }

  @ApiOperation({ summary: '每日充值统计' })
  @ApiBearerAuth()
  @Get('daily-recharge')
  dailyRecharge() {
    return this.statisticService.dailyRecharge();
  }

  @ApiOperation({ summary: '消费类别统计' })
  @ApiBearerAuth()
  @Get('consumption-category')
  consumptionCategory(@Query() dto: StatisticDto) {
    return this.statisticService.consumptionCategory(dto);
  }
}
