import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  Req,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { NoAuth } from 'src/core/decorators/auth.decorator';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @NoAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Body() user: LoginDto, @Req() req) {
    return this.authService.login(user.account, user.password);
  }

  @ApiOperation({ summary: '根据token获取用户详情' })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user')
  user(@Req() req) {
    return req.user;
  }
}
