import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ConsumptionType, HairType } from 'src/core/enums/common.enum';


@Entity('consumption_record')
export class ConsumptionRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    orderNum: string;

    @Column()
    amount: number;

    @Column({ type: 'tinyint' })
    consumptionType: ConsumptionType;

    @Column({ type: 'tinyint' })
    hairType: HairType;

    @Column({name: 'consumer_id'})
    consumerId: number;

    @Column({name: 'create_by'})
    createBy: number;

    @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
    createTime: Date;
}
