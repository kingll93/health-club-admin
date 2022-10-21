import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';


export class CreateUserDto {
    @ApiProperty({ description: '用户账号' })
    @IsNotEmpty({ message: '缺少用户账号' })
    readonly account: string;
  
    @ApiProperty({ description: '用户名' })
    @IsNotEmpty({ message: '缺少用户名' })
    readonly username: string;
  
    @ApiProperty({ description: '用户密码' })
    @IsNotEmpty({ message: '缺少用户密码' })
    readonly password: string;
}
