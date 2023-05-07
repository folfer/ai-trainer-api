import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { WorkoutSolicitationsRepository } from '../workout-solicitations-repository'

export class PrismaWorkoutSolicitationsRepository implements WorkoutSolicitationsRepository {
  async create(data: Prisma.WorkoutSolicitationCreateInput) {
    const workoutSolicitation = await prisma.workoutSolicitation.create({
      data,
    })

    return workoutSolicitation
  }
}
