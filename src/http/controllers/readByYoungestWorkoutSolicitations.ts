import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { MakeReadByYoungestWorkoutSolicitationUseCase } from '@/use-cases/factories/make-read-by-youngest-workout-solicitations-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function readByYoungestWorkoutSolicitations(request: FastifyRequest, reply: FastifyReply) {
  try {
    const readByYoungestWorkoutSolicitationUseCase = MakeReadByYoungestWorkoutSolicitationUseCase()

    const { workoutSolicitations } = await readByYoungestWorkoutSolicitationUseCase.execute({
      userId: request.user.sub
    })

    return reply.status(200).send({ workoutSolicitations })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
