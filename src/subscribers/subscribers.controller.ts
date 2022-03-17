import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { DeleteResult } from 'typeorm';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Subscriber } from './entities/subscriber.entity';
import { SubscribersService } from './subscribers.service';

@ApiBearerAuth()
@ApiTags('subscribers')
@Controller('subscribers')
export class SubscribersController {
    constructor(
        private readonly subscribersService: SubscribersService,
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({
        description: 'Array of subscriber registered returned',
        type: [Subscriber]
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized access'
    })
    async findAll(): Promise<Subscriber[]> {
        return await this.subscribersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOkResponse({
        description: 'Return the subscriber that has the searched id',
        type: Subscriber
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized access'
    })
    async findOne(@Param('id') id: string): Promise<Subscriber> {
        return await this.subscribersService.findOne(id);
    }

    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateSubscriberDto: UpdateSubscriberDto): Promise<Subscriber> {
        return await this.subscribersService.update(id, updateSubscriberDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<DeleteResult> {
        return await this.subscribersService.remove(id);
    }
}
