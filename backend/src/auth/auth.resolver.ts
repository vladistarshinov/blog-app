import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { AuthResponse } from './auth.response';
import { LoginUserInput } from './inputs/login-user.input';
import { CreateUserInput } from './inputs/create-user.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
	constructor(private readonly _authService: AuthService) {}

	@Mutation(() => AuthResponse)
	async login(@Args('data') input: LoginUserInput) {
		return this._authService.login(input);
	}

	/*@Mutation(() => AuthResponse)
	async getNewTokens(@Args('data') input: CreateUserInput): Promise<User> {
		return this._authService.login(input);
	}*/

	@Mutation(() => AuthResponse)
	async register(@Args('data') input: CreateUserInput) {
		return this._authService.register(input);
	}
}
