import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
            }

            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
            }

            const user = this.jwtService.verify(token, {secret: 'SECRET'});

            req.user = user;

            console.log(user.roles.some((role: string) => requiredRoles.includes(role)))
            return user.roles.some((role: string) => requiredRoles.includes(role));
        } catch (e) {
            console.log(e);
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
}
