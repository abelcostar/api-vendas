/* eslint-disable prettier/prettier */
import { getCustomRepository } from "typeorm"
import UsersRepository from "../typeorm/repositories/UserRepository"
import AppError from "@shared/erros/AppError"

interface IRequest {
  id: string
}

class DeleteUserService {
  public async execute({id}: IRequest): Promise<void> {
    const UserRepository = getCustomRepository(UsersRepository)

    const user = await UserRepository.findOne(id)

    if (!user) {
      throw new AppError('User not found')
    }

    await UserRepository.remove(user)

  }
}
export default DeleteUserService