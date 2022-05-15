import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/user/user.entity';
import { JwtAdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

export const Auth = (role: UserRole) =>
	applyDecorators(
		role === 'admin'
			? UseGuards(JwtAuthGuard, JwtAdminGuard)
			: UseGuards(JwtAuthGuard)
	);
