import { CardioSolicitation, Prisma } from '@prisma/client'

export interface CardioSolicitationsRepository {
  create(data: Prisma.CardioSolicitationUncheckedCreateInput): Promise<CardioSolicitation>
  readByYoungest(userId: string): Promise<CardioSolicitation[]>

}
