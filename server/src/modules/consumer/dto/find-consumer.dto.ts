import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Gender } from 'src/core/enums/common.enum';

export class FindConsumerDto {
  @ApiPropertyOptional({ description: '客户姓名' })
  readonly name?: string;

  @ApiPropertyOptional({ description: '客户手机号' })
  readonly phone?: string;

  @ApiPropertyOptional({ description: '性别' })
  @IsNumber()
  readonly gender?: Gender;

  @ApiPropertyOptional({ description: '开始时间' })
  readonly startTime?: string;

  @ApiPropertyOptional({ description: '结束时间' })
  readonly endTime?: string;

  @ApiPropertyOptional({ description: '页码' })
  @IsNumber()
  readonly page?: number;

  @ApiPropertyOptional({ description: '每页条数' })
  @IsNumber()
  readonly pageSize?: number;
}
