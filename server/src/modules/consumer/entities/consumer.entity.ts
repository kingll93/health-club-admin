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

@Entity('consumers')
export class Consumer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column('tinyint')
  gender: number;

  @Column({ type: 'double', default: 0 })
  balance: number;

  @Column({ unique: true, name: 'card_num' })
  cardNum: string;

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
