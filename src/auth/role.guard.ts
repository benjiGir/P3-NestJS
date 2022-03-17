import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./decorators/roles.decorator";
import { Role } from "./enum/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Role[]>('role', context.getHandler());
        
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        
        return requiredRoles.some((role) => request?.user.role === role);
    }
}
