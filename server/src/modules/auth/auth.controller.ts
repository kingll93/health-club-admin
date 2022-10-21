import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
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
}
