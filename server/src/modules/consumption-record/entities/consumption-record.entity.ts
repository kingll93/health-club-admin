/*
 * @Author: wll
 * @Date: 2022-10-29 14:14:53
 * @LastEditors: wll
 * @LastEditTime: 2022-10-29 14:46:01
 * @Description: 
 */
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ConsumptionType, HairType } from 'src/core/enums/common.enum';


@Entity('consumption_record')
export class ConsumptionRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, name: 'order_num' })
    orderNum: string;
    
    @Column({ type: 'tinyint', name: 'consumption_type' })
    consumptionType: ConsumptionType;

    @Column({ type: 'tinyint', nullable: true, name: 'hair_type' })
    hairType: HairType;

    @Column({ type: 'double' })
    amount: number;

    @Column({ default: '' })
    remark: string;

    @Column({name: 'consumer_id'})
    consumerId: number;

    @Column({name: 'create_by'})
    createBy: number;

    @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
    createTime: Date;
}
