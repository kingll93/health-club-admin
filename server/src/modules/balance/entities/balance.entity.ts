/*
 * @Author: wll
 * @Date: 2022-10-29 14:14:53
 * @LastEditors: wll
 * @LastEditTime: 2022-10-29 14:58:08
 * @Description: 
 */
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
  
    @Column({ type: 'double' })
    balance: number;
  
    @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
    createTime: string;
}
