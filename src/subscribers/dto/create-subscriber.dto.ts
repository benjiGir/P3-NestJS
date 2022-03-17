import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Role } from "../../auth/enum/role.enum";

export class CreateSubscriberDto {

    @IsString()
    @ApiProperty()
    readonly firstName: string;

    @IsString()
    @ApiProperty()
    readonly lastName: string;

    @IsString()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @ApiProperty()
    readonly password: string;

    @IsString()
    readonly role: Role;
}