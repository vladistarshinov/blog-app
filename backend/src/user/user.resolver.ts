import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User_ } from './decorators/user.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
	constructor(private readonly _userService: UserService) {}

	@Query(() => User)
	@UseGuards(GqlAuthGuard)
	async getProfile(@User_('id') id: string): Promise<User> {
		return await this._userService.getById(id);
	}

	@Query(() => [User])
	async getUsers(): Promise<User[]> {
		return await this._userService.getAll();
	}
}
