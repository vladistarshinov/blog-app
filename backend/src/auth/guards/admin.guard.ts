import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User, UserRole } from '../../user/user.entity';

export class JwtAdminGuard implements CanActivate {
	constructor(private _reflector: Reflector) {}

	canActivate(ctx: ExecutionContext): boolean {
		const context = GqlExecutionContext.create(ctx);
		const user = context.getContext().req.user as User;

		if (user.role !== UserRole.ADMIN)
			throw new ForbiddenException('Нет прав для просмотра');

		return true;
	}
}
