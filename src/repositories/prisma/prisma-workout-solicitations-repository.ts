import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { WorkoutSolicitationsRepository } from '../workout-solicitations-repository'

export class PrismaWorkoutSolicitationsRepository implements WorkoutSolicitationsRepository {
  async create(data: Prisma.WorkoutSolicitationUncheckedCreateInput) {
    const workoutSolicitation = await prisma.workoutSolicitation.create({
      data,
    })

    return workoutSolicitation
  }

  async readByYoungest (userId: string) {
    const workoutSolicitations = await prisma.workoutSolicitation.findMany({
      orderBy: {
        created_at: 'desc'
      },
      where: {
        user_id: userId
      }
    })

    return workoutSolicitations
  }
}
