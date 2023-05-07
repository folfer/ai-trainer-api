import { PrismaWorkoutSolicitationsRepository } from '@/repositories/prisma/prisma-workout-solicitations-repository'
import { WorkoutSolicitationUseCase } from '../workout-solicitation'

export function MakeWorkoutSolicitationUseCase() {
  const workoutSolicitationsRepository = new PrismaWorkoutSolicitationsRepository()
  const workoutSolicitationUseCase = new WorkoutSolicitationUseCase(workoutSolicitationsRepository)

  return workoutSolicitationUseCase
}
