import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { DietSolicitationsRepository } from '../diet-solicitations-repository'

export class PrismaDietSolicitationsRepository implements DietSolicitationsRepository {
  async create(data: Prisma.DietSolicitationUncheckedCreateInput) {
    const dietSolicitation = await prisma.dietSolicitation.create({
      data
    })
    
    return dietSolicitation
  }

  async readByYoungest (userId: string) {
    const dietSolicitations = await prisma.dietSolicitation.findMany({
      orderBy: {
        created_at: 'desc'
      },
      where: {
        user_id: userId
      }
    })

    return dietSolicitations
  }
}
