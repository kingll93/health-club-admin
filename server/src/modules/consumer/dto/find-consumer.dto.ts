/*
 * @Author: wll
 * @Date: 2022-10-29 14:14:53
 * @LastEditors: wll
 * @LastEditTime: 2022-10-29 15:21:53
 * @Description: 
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from 'src/core/enums/common.enum';

export class FindConsumerDto {
  @ApiPropertyOptional({ description: '客户姓名' })
  readonly name?: string;

  @ApiPropertyOptional({ description: '客户手机号' })
  readonly phone?: string;

  @ApiPropertyOptional({ description: '性别' })
  readonly gender?: Gender;

  @ApiPropertyOptional({ description: '开始时间' })
  readonly startTime?: string;

  @ApiPropertyOptional({ description: '结束时间' })
  readonly endTime?: string;

  @ApiPropertyOptional({ description: '页码' })
  readonly page?: number;

  @ApiPropertyOptional({ description: '每页条数' })
  readonly pageSize?: number;
}
