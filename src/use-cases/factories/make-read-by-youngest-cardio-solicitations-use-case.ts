import { PrismaCardioSolicitationsRepository } from '@/repositories/prisma/prisma-cardio-solicitations-repository'
import { ReadByYoungestCardioSolicitationsUseCase } from '../readByYoungestCardioSolicitations'

export function MakeReadByYoungestCardioSolicitationUseCase() {
  const cardioSolicitationsRepository = new PrismaCardioSolicitationsRepository()
  const readByYoungestCardioSolicitationsUseCase = new ReadByYoungestCardioSolicitationsUseCase(cardioSolicitationsRepository)

  return readByYoungestCardioSolicitationsUseCase
}
