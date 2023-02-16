import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { Exclude, Transform } from 'class-transformer';
import { genSalt, hash, compare, genSaltSync, hashSync } from 'bcryptjs';
import { UserType, UserStatus } from 'src/core/enums/common.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'tinyint',
    default: UserType.USER,
  })
  role: UserType;

  @Column({
    type: 'tinyint',
    default: UserStatus.ENABLED,
  })
  status: UserStatus;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
  })
  @Transform(params => dayjs(params.value).format('YYYY-MM-DD HH:mm:ss'), { toPlainOnly: true })
  createTime: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
  })
  @Transform(params => dayjs(params.value).format('YYYY-MM-DD HH:mm:ss'), { toPlainOnly: true })
  updateTime: string;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPwd() {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }
}
