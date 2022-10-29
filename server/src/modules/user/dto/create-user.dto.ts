import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';


export class CreateUserDto {
    @ApiProperty({ description: '用户账号' })
    @IsNotEmpty({ message: '缺少用户账号' })
    readonly account: string;
  
    @ApiProperty({ description: '用户姓名' })
    @IsNotEmpty({ message: '缺少用户姓名' })
    readonly name: string;
  
    @ApiProperty({ description: '用户密码' })
    @IsNotEmpty({ message: '缺少用户密码' })
    readonly password: string;
}
