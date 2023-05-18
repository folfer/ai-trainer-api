import { DietSolicitation, Prisma } from '@prisma/client'

export interface DietSolicitationsRepository {
  create(data: Prisma.DietSolicitationUncheckedCreateInput): Promise<DietSolicitation>
  readByYoungest(userId: string): Promise<DietSolicitation[]>
}
