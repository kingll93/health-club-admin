/*
 * @Author: wll
 * @Date: 2022-10-29 14:14:53
 * @LastEditors: wll
 * @LastEditTime: 2022-10-29 14:48:56
 * @Description: 
 */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { Gender, CardType, IsDeleted } from 'src/core/enums/common.enum';

@Entity('consumers')
export class Consumer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column('tinyint')
  gender: Gender;

  @Column({ type: 'double', default: 0 })
  balance: number;

  @Column({ unique: true, name: 'card_num' })
  cardNum: string;

  @Column({ type: 'tinyint', name: 'card_type', default: CardType.MEMBER })
  cardType: CardType;

  @Column({ type: 'tinyint', name: 'is_deleted', default: IsDeleted.NO })
  isDeleted: IsDeleted;

  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  createTime: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  updateTime: string;

  toResponseData() {
    this.createTime = dayjs(this.createTime).format('YYYY-MM-DD HH:mm:ss');
    this.updateTime = dayjs(this.updateTime).format('YYYY-MM-DD HH:mm:ss');
    return this;
  }
}
