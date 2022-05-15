import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly _userRepository: Repository<User>
	) {}

	async getAll(): Promise<User[]> {
		return await this._userRepository.find({});
	}
}
