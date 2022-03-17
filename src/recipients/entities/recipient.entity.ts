import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  subscriberID: number;
}
