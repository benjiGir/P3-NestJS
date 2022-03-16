import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteQueryBuilder, DeleteResult } from 'typeorm';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { Recipient } from './entities/recipient.entity';
import { RecipientsService } from './recipients.service';

@ApiBearerAuth()
@ApiTags('recipients')
@Controller('recipients')
export class RecipientsController {
    constructor(
        private readonly recipientsService: RecipientsService,
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findAllBySubscriberId(@Param('id') id: string): Promise<Recipient[]> {
        return await this.recipientsService.findAllBySubscribersId(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createRecipientDto: CreateRecipientDto): Promise<Recipient> {
        return await this.recipientsService.create(createRecipientDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateRecipientDto: UpdateRecipientDto): Promise<Recipient> {
        return await this.recipientsService.update(id, updateRecipientDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<DeleteResult> {
        return await this.recipientsService.remove(id);
    }
}
