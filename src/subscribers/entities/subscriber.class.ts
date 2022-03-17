import { IsEmail, IsString } from "class-validator";
import { Role } from "src/auth/enum/role.enum";

export class User {
    id?: number;
    firstName?: string;
    lastName?: string;
    @IsEmail()
    email?: string;
    @IsString()
    password?: string;
    roles?: Role;
}