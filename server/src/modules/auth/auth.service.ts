import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async getUser(payload: any): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    if (!existUser) {
      throw new UnauthorizedException('token验证失败不正确');
    }
    return existUser;
  }

  async login(account: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.account=:account', { account })
      .getOne();

    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误！');
    }

    const payload = { account: user.account, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
