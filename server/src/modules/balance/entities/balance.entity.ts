import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { BalanceType } from "src/core/enums/common.enum";


@Entity('balance')
export class Balance {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'consumer_id' })
    consumerId: number;
  
    @Column('tinyint')
    type: BalanceType;
  
    @Column({ name: 'order_num' })
    orderNum: string;
  
    @Column({ default: 0 })
    balance: number;
  
    @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
    createTime: string;
}
