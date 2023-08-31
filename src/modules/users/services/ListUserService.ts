//SERVIÇO PARA LISTAR OS USUARIOS

import { getCustomRepository } from "typeorm"
import UsersRepository from "../typeorm/repositories/UserRepository"
import User from "../typeorm/entities/Users"


class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository)

    const users = usersRepository.find()

    return users
  }
}

export default ListUserService