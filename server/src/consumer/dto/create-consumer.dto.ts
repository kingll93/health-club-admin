import { ApiProperty } from "@nestjs/swagger";


export class CreateConsumerDto {
    @ApiProperty({ description: '客户姓名' })
    readonly name: string;
  
    @ApiProperty({ description: '客户手机号' })
    readonly phone: string;
  
    @ApiProperty({ description: '客户性别' })
    readonly gender: number;
  
    @ApiProperty({ description: '账户余额' })
    readonly balance: number;
}
