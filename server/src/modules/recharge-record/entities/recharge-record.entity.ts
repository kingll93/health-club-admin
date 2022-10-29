/*
 * @Author: wll
 * @Date: 2022-10-29 14:14:53
 * @LastEditors: wll
 * @LastEditTime: 2022-10-29 14:47:43
 * @Description: 
 */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('recharge_record')
export class RechargeRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: 'order_num' })
  orderNum: string;

  @Column({ type: 'double' })
  amount: number;

  @Column({ default: '' })
  remark: string;

  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  createTime: Date;

  @Column({ name: 'consumer_id' })
  consumerId: number;

  @Column({ name: 'create_by' })
  createBy: number;
}