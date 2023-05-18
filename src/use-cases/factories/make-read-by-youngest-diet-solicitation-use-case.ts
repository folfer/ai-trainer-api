import { PrismaDietSolicitationsRepository } from '@/repositories/prisma/prisma-diet-solicitations-repository'
import { ReadByYoungestDietSolicitationsUseCase } from '../readByYoungestDietSolicitations'

export function MakeReadByYoungestDietSolicitationUseCase() {
  const dietSolicitationsRepository = new PrismaDietSolicitationsRepository()
  const readByYoungestDietSolicitationsUseCase = new ReadByYoungestDietSolicitationsUseCase(dietSolicitationsRepository)

  return readByYoungestDietSolicitationsUseCase
}
