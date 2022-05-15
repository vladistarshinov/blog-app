import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class AuthResponse extends User {
	@Field()
	accessToken: string;
	
	@Field()
	refreshToken: string;
}
