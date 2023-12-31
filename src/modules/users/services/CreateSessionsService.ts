/* eslint-disable prettier/prettier */
//SERVIÇO DE CRIAÇÃO DE SESSÃO DE USUÁRIO

import { getCustomRepository } from 'typeorm';
import AppError from '@shared/erros/AppError';
import User from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UserRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User,
  token: string
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Icorrect email/passeord combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Icorrect email/passeord combination', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return { user, token };
  }
}

export default CreateSessionsService;
