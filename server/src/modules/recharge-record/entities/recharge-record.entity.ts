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

  @Column()
  amount: number;
  
  @Column()
  remark: string;

  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  createTime: Date;

  @Column({ name: 'consumer_id' })
  consumerId: number;

  @Column({ name: 'create_by' })
  createBy: number;
}