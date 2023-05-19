import { DietSolicitationsRepository } from '@/repositories/diet-solicitations-repository'
import { DietSolicitation } from '@prisma/client'

interface readByYoungestUseCaseRequest {
  userId: string
}
interface readByYoungestUseCaseResponse {
  dietSolicitations: DietSolicitation[]
}

export class ReadByYoungestDietSolicitationsUseCase {

  constructor(private dietSolicitationsRepository: DietSolicitationsRepository) {}

  async execute({ userId }: readByYoungestUseCaseRequest): Promise<readByYoungestUseCaseResponse> {
    
    const dietSolicitations = await this.dietSolicitationsRepository.readByYoungest(userId)
    
    return { dietSolicitations }
  }
} 
