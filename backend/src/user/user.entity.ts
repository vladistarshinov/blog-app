import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

@ObjectType()
@Entity('users')
export class User {
	@ApiProperty({
		example: '9ca88274-90ff-464d-b1a2-04c2a33e7751',
		description: 'UUID пользователя',
	})
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ApiProperty({
		example: 'Олег',
		description: 'Имя',
	})
	@Field()
	@Column()
	firstname: string;

	@ApiProperty({
		example: 'Ватутин',
		description: 'Фамилия',
	})
	@Field()
	@Column()
	lastname: string;

	@ApiProperty({
		example: 'Занимаюсь танцами, вяжу, пою бардовские песенки...',
		description: 'Описание (информация о себе)',
	})
	@Field({ nullable: true })
	@Column({ type: 'text', nullable: true })
	desc: string;

	@ApiProperty({
		example: 'example@mail.com',
		description: 'Электронная почта пользователя',
	})
	@Field()
	@Column({ unique: true })
	email!: string;

	@Field()
	@Column()
	password!: string;

	@Field()
	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER,
	})
	role!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	avatarUrl: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	country: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	phone: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	rememberToken: string;

	@Field()
	@Column({ default: false })
	isConfirmed: boolean;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;
}
