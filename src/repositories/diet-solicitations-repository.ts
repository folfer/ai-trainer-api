import { Prisma, DietSolicitation } from '@prisma/client'

export interface DietSolicitationsRepository {
  create(data: Prisma.DietSolicitationCreateInput): Promise<DietSolicitation>
}
