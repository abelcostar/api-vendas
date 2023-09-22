/* eslint-disable prettier/prettier */
//SERVIÇO DE CRIAÇÃO DE USUÁRIO

import { getCustomRepository } from 'typeorm';
import AppError from '@shared/erros/AppError';
import User from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UserRepository';
import path from 'path';
import fs from 'fs'
import uploadConfig from '@config/upload'

interface IRequest {
  User_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ User_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(User_id)

    if (!user) {
      throw new AppError('User not found')
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService;
