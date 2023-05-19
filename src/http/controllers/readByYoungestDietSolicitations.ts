import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { MakeReadByYoungestDietSolicitationUseCase } from '@/use-cases/factories/make-read-by-youngest-diet-solicitation-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function readByYoungestDietSolicitations(request: FastifyRequest, reply: FastifyReply) {
  try {
    const readByYoungestDietSolicitationUseCase = MakeReadByYoungestDietSolicitationUseCase()

    const { dietSolicitations } = await readByYoungestDietSolicitationUseCase.execute({
      userId: request.user.sub
    })

    return reply.status(200).send({ dietSolicitations })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
