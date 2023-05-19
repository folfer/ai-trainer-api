import { Prisma, WorkoutSolicitation } from '@prisma/client'

export interface WorkoutSolicitationsRepository {
  create(data: Prisma.WorkoutSolicitationUncheckedCreateInput): Promise<WorkoutSolicitation>
  readByYoungest(userId: string): Promise<WorkoutSolicitation[]>
}
