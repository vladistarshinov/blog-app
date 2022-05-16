import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/user/user.entity';
import { JwtAdminGuard } from '../guards/admin.guard';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

export const Auth = (role: UserRole = UserRole.USER) =>
	applyDecorators(
		role === 'admin'
			? UseGuards(GqlAuthGuard, JwtAdminGuard)
			: UseGuards(GqlAuthGuard)
	);
