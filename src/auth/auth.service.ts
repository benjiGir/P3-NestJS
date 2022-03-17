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

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.validateUser(loginUserDto);

        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async validateUser(loginUserDto: LoginUserDto): Promise<Subscriber> {
        const { email, password } = loginUserDto;

        const user = await this.subscribersService.findByEmail(email);
        if (!(await this.subscribersService.validatePassword(password, user.password))) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
