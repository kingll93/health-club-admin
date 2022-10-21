import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindRechargeRecordDto {
  @ApiPropertyOptional({ description: '客户姓名' })
  readonly consumerName: string;

  @ApiPropertyOptional({ description: '操作人' })
  readonly userName: string;

  @ApiPropertyOptional({ description: '页码' })
  @IsNumber()
  readonly page: number;

  @ApiPropertyOptional({ description: '每页条数' })
  @IsNumber()
  readonly pageSize: number;
}
