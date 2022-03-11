import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscribersService } from './subscribers.service';

@Controller('subscribers')
export class SubscribersController {
    constructor(
        private readonly subscribersService: SubscribersService,
    ) {}

    @Get()
    findAll() {
        return this.subscribersService.findAll();
    }

    //@UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subscribersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSubscriberDto: UpdateSubscriberDto) {
        return this.subscribersService.update(id, updateSubscriberDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.subscribersService.remove(id);
    }
}
