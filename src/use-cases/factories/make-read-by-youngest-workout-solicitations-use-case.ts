import { PrismaWorkoutSolicitationsRepository } from '@/repositories/prisma/prisma-workout-solicitations-repository'
import { ReadByYoungestWorkoutSolicitationsUseCase } from '../readByYoungestWorkoutSolicitations'

export function MakeReadByYoungestWorkoutSolicitationUseCase() {
  const workoutSolicitationsRepository = new PrismaWorkoutSolicitationsRepository()
  const readByYoungestWorkoutSolicitationsUseCase = new ReadByYoungestWorkoutSolicitationsUseCase(workoutSolicitationsRepository)

  return readByYoungestWorkoutSolicitationsUseCase
}
