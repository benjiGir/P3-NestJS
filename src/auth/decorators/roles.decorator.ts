import { SetMetadata } from "@nestjs/common";
import { Role } from "../enum/role.enum";

export const ROLES_KEY = 'role';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);