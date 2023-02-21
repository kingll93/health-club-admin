import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto, ChangePassWordDto } from './dto/update-user.dto';
import { Role } from 'src/core/decorators/role.decorator';
import { UserRole } from 'src/core/enums/common.enum';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '修改密码' })
  @ApiBearerAuth()
  @Patch('change-password')
  changePassword(@Req() req, @Body() updateUserDto: ChangePassWordDto) {
    return this.userService.changePassword(req.user, updateUserDto);
  }

  @ApiOperation({ summary: '新增用户' })
  @ApiBearerAuth()
  @Role(UserRole.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '用户列表' })
  @ApiBearerAuth()
  @Role(UserRole.ADMIN)
  @Get()
  findAll(@Query() dto: FindUserDto) {
    return this.userService.findAll(dto);
  }

  @ApiOperation({ summary: '用户详情' })
  @ApiBearerAuth()
  @Role(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: '编辑用户' })
  @ApiBearerAuth()
  @Role(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
