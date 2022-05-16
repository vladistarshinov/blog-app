import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { LoginUserInput } from './inputs/login-user.input';
import { CreateUserInput } from './inputs/create-user.input';
import { JwtService } from '@nestjs/jwt';
import { hash, genSalt, compare } from 'bcryptjs';
import {RefreshTokenInput} from "./inputs/refresh-token.input";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly _userRepository: Repository<User>,
		private readonly _jwtService: JwtService
	) {}

	async login(dto: LoginUserInput) {
		const user = await this.validateUser(dto);
		const tokens = await this.issueTokenPair(user.id);
		return {
			...user,
			...tokens,
		};
	}

	async register(dto: CreateUserInput): Promise<User> {
		const user = await this._userRepository.findOne({
			where: { email: dto.email.toLowerCase().trim() },
		});

		if (user)
			throw new BadRequestException(
				'Пользователь с таким email уже есть в системе'
			);

		const salt = await genSalt(10);

		const newUser = this._userRepository.create({
			email: dto.email.toLowerCase().trim(),
			password: await hash(dto.password, salt),
			firstname: dto.firstname.toLowerCase().trim(),
			lastname: dto.lastname.toLowerCase().trim(),
		});

		const savedUser = await this._userRepository.save(newUser);

		const tokens = await this.issueTokenPair(savedUser.id);

		return {
			...savedUser,
			...tokens,
		};
	}

	async validateUser(dto: LoginUserInput): Promise<User> {
		const user = await this._userRepository.findOne({
			where: { email: dto.email },
		});

		if (!user) {
			throw new UnauthorizedException('Пользователь не найден');
		}

		const isValidPassword = await compare(dto.password, user.password);

		if (!isValidPassword) {
			throw new UnauthorizedException('Неверный пароль');
		}

		return user;
	}

	async issueTokenPair(userId: string) {
		const data = { _id: userId };

		const accessToken = await this._jwtService.signAsync(data, {
			expiresIn: '1h',
		});

		const refreshToken = await this._jwtService.signAsync(data, {
			expiresIn: '14d',
		});

		return { accessToken, refreshToken };
	}

	async getNewTokens(refreshToken: string) {
		if (!refreshToken) throw new UnauthorizedException('Please sign in');

		const res = await this._jwtService.verifyAsync(refreshToken);
		if (!res) throw new UnauthorizedException('Invalid token or expired');

		const user = await this._userRepository.findOneBy({ id: res.id});
		const tokens = await this.issueTokenPair(user.id);
		return {
			...user,
			...tokens,
		};
	}

	async findByEmail(email: string) {
		return this._userRepository.findOneBy({ email });
	}
}
