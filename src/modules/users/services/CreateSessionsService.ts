//SERVIÇO DE CRIAÇÃO DE SESSÃO DE USUÁRIO

import { getCustomRepository } from 'typeorm';
import AppError from '@shared/erros/AppError';
import User from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UserRepository';
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Icorrect email/passeord combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Icorrect email/passeord combination', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
