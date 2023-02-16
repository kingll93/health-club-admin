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
import * as dayjs from 'dayjs';
import { Transform } from 'class-transformer';
import { IsDeleted } from 'src/core/enums/common.enum';

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
  @Transform(params => {
    console.log(params.value)
    return dayjs(params.value).format('YYYY-MM-DD HH:mm:ss')
  }, { toPlainOnly: true })
  createTime: string;

  @Column({ name: 'consumer_id' })
  consumerId: number;

  @Column({ name: 'create_by' })
  createBy: number;

  @Column({ type: 'tinyint', name: 'is_deleted', default: IsDeleted.NO })
  isDeleted: IsDeleted;
}