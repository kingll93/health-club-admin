import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { genSalt, hash, compare, genSaltSync, hashSync } from 'bcryptjs';
import { UserType, StatusValue } from 'src/core/enums/common.enum';

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
    default: StatusValue.ENABLED,
  })
  status: StatusValue;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }
}
