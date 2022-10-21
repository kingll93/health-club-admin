import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';
import { Consumer } from './entities/consumer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consumer])],
  controllers: [ConsumerController],
  providers: [ConsumerService],
  exports: [ConsumerService]
})
export class ConsumerModule {}
