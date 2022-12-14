/*
 * @Author: wll
 * @Date: 2022-10-29 14:14:53
 * @LastEditors: wll
 * @LastEditTime: 2022-10-29 15:45:14
 * @Description: 
 */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ConsumptionType, HairType } from "src/core/enums/common.enum";


export class CreateConsumptionRecordDto {
    @ApiProperty({ description: '客户id' })
    @IsNotEmpty({ message: '缺少客户id' })
    readonly consumerId: number;

    @ApiProperty({ description: '消费类型枚举值 1:养发 2:染发' })
    @IsNumber()
    @IsNotEmpty({ message: '缺少参数"消费类型"枚举值' })
    readonly consumptionType: ConsumptionType;
  
    @ApiProperty({ description: '消费类型枚举值 1:养发 2:染发' })
    @IsNumber()
    @IsNotEmpty({ message: '缺少参数"头发类型"枚举值' })
    hairType?: HairType;
  
    @IsNumber()
    @ApiProperty({ description: '消费金额' })
    @IsNotEmpty({ message: '缺少消费金额' })
    readonly amount: number;

    @ApiPropertyOptional({ description: '备注' })
    readonly remark: string;
}
