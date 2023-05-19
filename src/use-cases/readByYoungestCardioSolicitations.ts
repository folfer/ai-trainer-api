import { CardioSolicitationsRepository } from '@/repositories/cardio-solicitations-repository'
import { CardioSolicitation } from '@prisma/client'

interface readByYoungestUseCaseRequest {
  userId: string
}
interface readByYoungestUseCaseResponse {
  cardioSolicitations: CardioSolicitation[]
}

export class ReadByYoungestCardioSolicitationsUseCase {

  constructor(private cardioSolicitationsRepository: CardioSolicitationsRepository) {}

  async execute({ userId }: readByYoungestUseCaseRequest): Promise<readByYoungestUseCaseResponse> {
    
    const cardioSolicitations = await this.cardioSolicitationsRepository.readByYoungest(userId)
    
    return { cardioSolicitations }
  }
} 
