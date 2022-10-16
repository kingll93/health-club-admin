import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ length: 100 })
    username: string; // 用户名

    @Column()
    password: string;  // 密码

    @Column()
    avatar: string;   //头像

    @Column()
    email: string;

    @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
    role: string;   // 用户角色

    @CreateDateColumn({
        type: 'timestamp',
        name: 'create_time',
    })
    createTime: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'update_time',
    })
    updateTime: Date;

    //   @BeforeInsert() 
    //   async encryptPwd() { 
    //     this.password = await bcrypt.hashSync(this.password); 
    //   } 
}