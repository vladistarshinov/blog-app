import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async getUser(): Promise<string> {
    return await this.userService.getUser();
  }
}
