import { PrismaCardioSolicitationsRepository } from '@/repositories/prisma/prisma-cardio-solicitations-repository'
import { CardioSolicitationUseCase } from '../cardio-solicitation'

export function MakeCardioSolicitationUseCase() {
  const cardioSolicitationsRepository = new PrismaCardioSolicitationsRepository()
  const cardioSolicitationUseCase = new CardioSolicitationUseCase(cardioSolicitationsRepository)

  return cardioSolicitationUseCase
}
