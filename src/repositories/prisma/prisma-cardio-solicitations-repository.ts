import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CardioSolicitationsRepository } from '../cardio-solicitations-repository'

export class PrismaCardioSolicitationsRepository implements CardioSolicitationsRepository {
  async create(data: Prisma.CardioSolicitationUncheckedCreateInput) {
    const cardioSolicitation = await prisma.cardioSolicitation.create({
      data,
    })

    return cardioSolicitation
  }

  async readByYoungest (userId: string) {
    const cardioSolicitations = await prisma.cardioSolicitation.findMany({
      orderBy: {
        created_at: 'desc'
      },
      where: {
        user_id: userId
      }
    })

    return cardioSolicitations
  }

}
