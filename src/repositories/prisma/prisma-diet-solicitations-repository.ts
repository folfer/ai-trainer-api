import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { DietSolicitationsRepository } from '../diet-solicitations-repository'

export class PrismaDietSolicitationsRepository implements DietSolicitationsRepository {
  async create(data: Prisma.DietSolicitationCreateInput) {
    const DietSolicitation = await prisma.dietSolicitation.create({
      data,
    })

    return DietSolicitation
  }
}
