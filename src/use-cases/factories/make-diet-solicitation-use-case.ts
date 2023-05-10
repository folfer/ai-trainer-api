import { PrismaDietSolicitationsRepository } from '@/repositories/prisma/prisma-diet-solicitations-repository'
import { DietSolicitationUseCase } from '../diet-solicitation'

export function MakeDietSolicitationUseCase() {
  const dietSolicitationsRepository = new PrismaDietSolicitationsRepository()
  const dietSolicitationUseCase = new DietSolicitationUseCase(dietSolicitationsRepository)

  return dietSolicitationUseCase
}
