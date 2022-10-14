import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';
import { ConsumerEntity } from './entities/consumer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumerEntity])],
  controllers: [ConsumerController],
  providers: [ConsumerService]
})
export class ConsumerModule {}
