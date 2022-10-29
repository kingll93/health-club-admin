/*
 * @Author: wll
 * @Date: 2022-10-29 14:14:53
 * @LastEditors: wll
 * @LastEditTime: 2022-10-29 15:53:03
 * @Description: 
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRechargeRecordDto {
  @ApiProperty({ description: '客户id' })
  @IsNotEmpty({ message: '缺少客户id' })
  readonly consumerId: number;

  @ApiProperty({ description: '充值金额' })
  @IsPositive({ message: "充值金额必须大于0" })
  @IsNotEmpty({ message: '缺少充值金额' })
  readonly amount: number;

  @ApiPropertyOptional({ description: '备注' })
  readonly remark: string;
}
