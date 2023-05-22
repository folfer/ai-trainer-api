import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ReadUserUseCaseRequest {
  user_id: string
}

interface ReadUserUseCaseResponse {
  user: User
}

export class ReadUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ user_id }: ReadUserUseCaseRequest): Promise<ReadUserUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
