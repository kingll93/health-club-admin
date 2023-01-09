/*
 * @Author: wll
 * @Date: 2022-10-29 14:14:53
 * @LastEditors: wll
 * @LastEditTime: 2022-10-29 14:58:08
 * @Description: 
 */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { BalanceType, IsDeleted } from "src/core/enums/common.enum";


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

    @Column({ type: 'tinyint', name: 'is_deleted', default: IsDeleted.NO })
    isDeleted: IsDeleted;
  
    @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
    createTime: string;
}
