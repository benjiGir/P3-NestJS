import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateSubscriberDto } from 'src/subscribers/dto/create-subscriber.dto';
import { SubscribersService } from 'src/subscribers/subscribers.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly subscribersService: SubscribersService,
    ) {}

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }
    
    @Post('register')
    create(@Body() createSubscriberDto: CreateSubscriberDto) {
        return this.subscribersService.create(createSubscriberDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async test() {
        return 'Success';
    }
}
