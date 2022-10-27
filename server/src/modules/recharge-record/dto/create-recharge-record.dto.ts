import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRechargeRecordDto {
  @ApiProperty({ description: '客户id' })
  @IsNotEmpty({ message: '缺少客户id' })
  readonly consumerId: number;

  @ApiProperty({ description: '充值金额' })
  @IsNotEmpty({ message: '缺少充值金额' })
  readonly amount: number;

  @ApiPropertyOptional({ description: '备注' })
  readonly remark: string;
}
