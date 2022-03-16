import { IsEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Subscriber {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    firstName: string;

    @Column()
    @ApiProperty()
    lastName: string;

    @Column()
    @IsEmail()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    password: string;

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    updated_at: Date

}