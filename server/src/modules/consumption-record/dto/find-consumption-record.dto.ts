/*
 * @Author: wll
 * @Date: 2022-10-29 14:14:53
 * @LastEditors: wll
 * @LastEditTime: 2022-10-29 15:23:06
 * @Description: 
 */
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindConsumptionRecordDto {
  @ApiPropertyOptional({ description: '客户姓名' })
  readonly consumerName: string;

  @ApiPropertyOptional({ description: '操作人' })
  readonly userName: string;

  @ApiPropertyOptional({ description: '开始时间' })
  readonly startTime?: string;

  @ApiPropertyOptional({ description: '结束时间' })
  readonly endTime?: string;

  @ApiPropertyOptional({ description: '页码' })
  readonly page: number;

  @ApiPropertyOptional({ description: '每页条数' })
  readonly pageSize: number;
}
