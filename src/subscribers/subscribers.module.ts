import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleGuard } from 'src/auth/role.guard';
import { Subscriber } from './entities/subscriber.entity';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  controllers: [SubscribersController],
  providers: [
    SubscribersService,

  ],
  exports: [SubscribersService]
})
export class SubscribersModule {}
