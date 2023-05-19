import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { MakeReadByYoungestCardioSolicitationUseCase } from '@/use-cases/factories/make-read-by-youngest-cardio-solicitations-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function readByYoungestCardioSolicitations(request: FastifyRequest, reply: FastifyReply) {
  try {
    const readByYoungestCardioSolicitationUseCase = MakeReadByYoungestCardioSolicitationUseCase()

    const { cardioSolicitations } = await readByYoungestCardioSolicitationUseCase.execute({
      userId: request.user.sub
    })

    return reply.status(200).send({ cardioSolicitations })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
