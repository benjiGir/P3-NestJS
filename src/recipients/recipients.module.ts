import { Module } from '@nestjs/common';
import { RecipientsService } from './recipients.service';
import { RecipientsController } from './recipients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipient } from './entities/recipient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipient])],
  providers: [RecipientsService],
  controllers: [RecipientsController],
  exports: [RecipientsService],
})
export class RecipientsModule {}
