import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';


export class CreateConsumptionRecordDto {
    @ApiProperty({ description: '客户id' })
    @IsNotEmpty({ message: '缺少客户id' })
    readonly consumerId: number;
  
    @ApiProperty({ description: '消费金额' })
    @IsNotEmpty({ message: '缺少消费金额' })
    readonly amount: number;
}
