import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { DietSolicitationsRepository } from '../diet-solicitations-repository'

export class PrismaDietSolicitationsRepository implements DietSolicitationsRepository {
  async create(data: Prisma.DietSolicitationCreateInput) {
    const dietSolicitation = await prisma.dietSolicitation.create({
      data,
    })

    return dietSolicitation
  }
}
