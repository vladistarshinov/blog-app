import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, UserRole } from '../../user/user.entity';

export class JwtAdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(ctx: ExecutionContext): boolean {
		const request = ctx.switchToHttp().getRequest<{ user: User }>();
		const user = request.user;

		if (user.role !== UserRole.ADMIN)
			throw new ForbiddenException('Нет прав для просмотра');

		return true;
	}
}
