import { PartialType, PickType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { UserStatus } from 'src/core/enums/common.enum';

export class UpdateUserDto extends PickType(PartialType(CreateUserDto), ['name', 'password'])  {

    @ApiPropertyOptional({ description: '1：启用，0：禁用' })
    @IsEnum(UserStatus, { message: '参数status值不合法' })
    @IsOptional()
    readonly status?: UserStatus;
}
export class ChangePassWordDto extends PickType(CreateUserDto, ['password']) {}