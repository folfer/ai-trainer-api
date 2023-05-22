import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ReadUserUseCase } from '../readUser'

export function makeReadUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const readUserUseCase = new ReadUserUseCase(usersRepository)

  return readUserUseCase
}
