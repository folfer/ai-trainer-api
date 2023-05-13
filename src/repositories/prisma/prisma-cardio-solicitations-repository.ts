import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CardioSolicitationsRepository } from '../cardio-solicitations-repository'

export class PrismaCardioSolicitationsRepository implements CardioSolicitationsRepository {
  async create(data: Prisma.CardioSolicitationCreateInput) {
    const cardioSolicitation = await prisma.cardioSolicitation.create({
      data,
    })

    return cardioSolicitation
  }
}
