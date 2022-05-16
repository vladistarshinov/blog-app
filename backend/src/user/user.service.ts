import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly _userRepository: Repository<User>
	) {}

	async getById(id: string) {
		const user = await this._userRepository.findOneBy({ id });
		if (!user) throw new NotFoundException('Пользователь не найден');

		return user;
	}

	async getAll(): Promise<User[]> {
		return await this._userRepository.find({});
	}
}
