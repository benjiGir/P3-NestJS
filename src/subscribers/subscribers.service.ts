import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as argon from 'argon2';

import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Subscriber } from './entities/subscriber.entity';

@Injectable()
export class SubscribersService {
    constructor(
        @InjectRepository(Subscriber)
        private readonly subscriberRepository: Repository<Subscriber>,
    ) {}

    async findAll(): Promise<Subscriber[]>  {
        const subscribers = await this.subscriberRepository.find();

        const subscribersFiltered = subscribers.map(subscriber => {
            delete subscriber.password
            return subscriber
        })

        return subscribersFiltered
    }

    async findOne(id: string): Promise<Subscriber> {
        const subscriber = await this.subscriberRepository.findOne(id);

        if (!subscriber) throw new NotFoundException(`Subscriber #${id} not found`);

        delete subscriber.password
        return subscriber;
    }

    async findByEmail(email: string): Promise<Subscriber> {
        const subscriber = await this.subscriberRepository.findOne({
            where: {
                email: email,
            },
        });

        return subscriber;
    }

    async create(createSubscriberDto: CreateSubscriberDto): Promise<Subscriber> {
        const { email } = createSubscriberDto;
        const existingSubscriber = await this.findByEmail(email);
        if (existingSubscriber) throw new ConflictException('User already exists');

        const subscriber = this.subscriberRepository.create(createSubscriberDto);
        subscriber.password = await this.hashPassword(subscriber.password);

        return this.subscriberRepository.save(subscriber);
    }

    async update(id: string, updateSubscriberDto: UpdateSubscriberDto): Promise<Subscriber>{
        const subscriber = await this.subscriberRepository.preload({
            id: +id,
            ...updateSubscriberDto,
        });

        if (!subscriber) throw new NotFoundException(`Subscriber #${id} not found`);

        delete subscriber.password
        return this.subscriberRepository.save(subscriber);
    }

    async remove(id: string): Promise<DeleteResult> {
        const subscriber = await this.findOne(id)

        if (!subscriber) throw new NotFoundException(`Subscriber #${id} not found`)

        return await this.subscriberRepository.delete({ id: subscriber.id });
    }

    async hashPassword(password: string): Promise<string> {
        return await argon.hash(password);
    }

    async validatePassword(password: string, userPassword: string): Promise<boolean> {
        return await argon.verify(userPassword, password);
    }
}
