import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { Recipient } from './entities/recipient.entity';

@Injectable()
export class RecipientsService {
  constructor(
    @InjectRepository(Recipient)
    private readonly recipientRepository: Repository<Recipient>,
  ) {}

  async findAllBySubscribersId(id: string): Promise<Recipient[]> {
    return this.recipientRepository.find({
      where: {
        subscriberID: +id,
      },
    });
  }

  async create(createRecipientDto: CreateRecipientDto): Promise<Recipient> {
    const recipient = this.recipientRepository.create(createRecipientDto);

    return this.recipientRepository.save(recipient);
  }

  async update(
    id: string,
    updateRecipientDto: UpdateRecipientDto,
  ): Promise<Recipient> {
    const recipient = await this.recipientRepository.preload({
      id: +id,
      ...updateRecipientDto,
    });

    if (!recipient) throw new NotFoundException(`Recipient #${id} not found`);

    return this.recipientRepository.save(recipient);
  }

  async remove(id: string): Promise<DeleteResult> {
    const recipient = await this.recipientRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!recipient) throw new NotFoundException(`Recipient #${id} not found`);

    return await this.recipientRepository.delete({ id: recipient.id });
  }
}
