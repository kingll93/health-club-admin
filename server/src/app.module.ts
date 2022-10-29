import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import envConfig from '../config/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { ConsumerModule } from './modules/consumer/consumer.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConsumptionRecordModule } from './modules/consumption-record/consumption-record.module';
import { RechargeRecordModule } from './modules/recharge-record/recharge-record.module';
import { BalanceModule } from './modules/balance/balance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        host: configService.get('DB_HOST'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT'), // 端口号
        username: configService.get('DB_USER'), // 用户名
        password: configService.get('DB_PASSWORD'), // 密码
        database: configService.get('DB_DATABASE'), //数据库名
        timezone: '+08:00', //服务器上配置的时区
        autoLoadEntities: true, // 自动加载Entities
        synchronize: configService.get('DB_SYNCHRONIZE'), //根据实体自动创建数据库表
      }),
    }),
    ConsumerModule,
    UserModule,
    AuthModule,
    ConsumptionRecordModule,
    RechargeRecordModule,
    BalanceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
