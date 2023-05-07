import { Prisma, WorkoutSolicitation } from '@prisma/client'

export interface WorkoutSolicitationsRepository {
  create(data: Prisma.WorkoutSolicitationCreateInput): Promise<WorkoutSolicitation>
}
