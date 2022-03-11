import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Subscriber } from 'src/subscribers/entities/subscriber.entity';
import { SubscribersService } from 'src/subscribers/subscribers.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private subscribersService: SubscribersService,
        private jwtService: JwtService,
    ) {}

    async login(loginUserDto: LoginUserDto) {
        const user = await this.validateUser(loginUserDto);

        const payload = {
            userId: user.id,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(loginUserDto: LoginUserDto): Promise<Subscriber> {
        const { email, password } = loginUserDto;

        const user = await this.subscribersService.findByEmail(email);
        if (!(await user?.validatePassword(password))) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
