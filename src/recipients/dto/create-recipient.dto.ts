import { IsNumber, IsString } from 'class-validator';

export class CreateRecipientDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsNumber()
  readonly subscriberID: number;
}
