import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity('consumption_record')
export class ConsumptionRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number

    @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
    createTime: Date;

    @Column({name: 'consumer_id'})
    consumerId: number;

    @Column({name: 'create_by'})
    createBy: number;
}
