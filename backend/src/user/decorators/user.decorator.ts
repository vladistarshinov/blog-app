import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../user.entity';

type TypeData = keyof User;

export const User_ = createParamDecorator(
	(data: TypeData, ctx: ExecutionContext) => {
		let user: User;

		if (ctx.getType() === 'http') {
			user = ctx.switchToHttp().getRequest().user;
		} else {
			const context = GqlExecutionContext.create(ctx);
			user = context.getContext().req.user;
		}

		return data ? user[data] : user;
	}
);
