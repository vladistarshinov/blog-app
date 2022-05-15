import { Field, InputType } from '@nestjs/graphql';
import { LoginUserInput } from './login-user.input';

@InputType()
export class CreateUserInput extends LoginUserInput {
	@Field()
	readonly firstname: string;

	@Field()
	readonly lastname: string;
}
