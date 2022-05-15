import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly _userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this._userService.getAll();
  }
}
