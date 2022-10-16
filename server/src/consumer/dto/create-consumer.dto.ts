import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';


export class CreateConsumerDto {
    @ApiProperty({ description: '客户姓名' })
    @IsNotEmpty({ message: '缺少客户姓名' })
    readonly name: string;
  
    @ApiProperty({ description: '客户手机号' })
    @IsNotEmpty({ message: '缺少客户手机号' })
    readonly phone: string;
  
    @ApiProperty({ description: '客户性别' })
    @IsNotEmpty({ message: '缺少客户性别' })
    readonly gender: number;
  
    @ApiProperty({ description: '账户余额' })
    readonly balance: number;
}
