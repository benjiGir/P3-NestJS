import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateSubscriberDto } from 'src/subscribers/dto/create-subscriber.dto';
import { Subscriber } from 'src/subscribers/entities/subscriber.entity';
import { SubscribersService } from 'src/subscribers/subscribers.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggingInterceptor } from './logging.interceptors';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly subscribersService: SubscribersService,
  ) {}

  @Public()
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.login(loginUserDto);
  }

  @Public()
  @Post('register')
  create(
    @Body() createSubscriberDto: CreateSubscriberDto,
  ): Promise<Subscriber> {
    return this.subscribersService.create(createSubscriberDto);
  }

  @Get('verify')
  async checkEmail(email: string): Promise<Subscriber> {
    return this.subscribersService.findByEmail(email);
  }
}
