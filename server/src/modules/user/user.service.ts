import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { ChangePassWordDto, UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from 'src/core/enums/common.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { account } = createUserDto;

    const existUser = await this.userRepository.findOne({
      where: { account },
    });
    if (existUser) {
      throw new ConflictException('账号已存在');
    }

    const newUser = plainToInstance(User, createUserDto, { ignoreDecorators: true });
    return await this.userRepository.save(newUser);
  }

  async findAll(dto: FindUserDto) {
    const {
      name = '',
      page = 1,
      pageSize = 10
    } = dto;

    const [ list, total ] = await this.userRepository.findAndCount({
      where: {
        ...!!name ? { name: Like(`%${name}%`) } : null,
        role: Not(UserRole.ADMIN)
      },
      skip: pageSize * (page - 1),
      take: 10
    })

    return {
      list,
      total
    }
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existUser = await this.userRepository.findOneBy({id});
    if (!existUser) {
      throw new BadRequestException(`id为${id}的用户不存在`);
    }
    const updateUser = this.userRepository.merge(existUser, updateUserDto)
    return await this.userRepository.save(updateUser)
  }

  async changePassword(user: User, dto: ChangePassWordDto) {
    const updateUser = this.userRepository.merge(user, {
      password: dto.password
    });
    return await this.userRepository.save(updateUser);
  }
}
