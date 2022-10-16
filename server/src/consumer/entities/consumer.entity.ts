import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('consumers')
export class ConsumerEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column('tinyint')
  gender: number;

  @Column({ default: 0 })
  balance: number;

  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  updateTime: Date;
}
