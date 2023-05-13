import { Prisma, CardioSolicitation } from '@prisma/client'

export interface CardioSolicitationsRepository {
  create(data: Prisma.CardioSolicitationCreateInput): Promise<CardioSolicitation>
}
