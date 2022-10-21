import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindConsumptionRecordDto {
  @ApiPropertyOptional({ description: '客户姓名' })
  readonly name: string;

  @ApiPropertyOptional({ description: '页码' })
  @IsNumber()
  readonly page: number;

  @ApiPropertyOptional({ description: '每页条数' })
  @IsNumber()
  readonly pageSize: number;
}
