import { MakeWorkoutSolicitationUseCase } from '@/use-cases/factories/make-workout-solicitation-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Configuration, OpenAIApi } from 'openai'
import { z } from 'zod'

const configuration = new Configuration({
  organization: 'org-GS5lh0UtOYhBD8NXXv8XMWvU',
  apiKey: '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',
})

const openai = new OpenAIApi(configuration)

export async function WorkoutSolicitation(request: FastifyRequest, reply: FastifyReply) {
  const workoutSolicitationBodySchema = z.object({
    age: z.number().min(1).max(100),
    weight: z.number(),
    height: z.number(),
    gender: z.enum(['Male', 'Female']),
    goal: z.enum(['hypertrophy', 'slimming']),
    message: z.string(),
  })

  const { age, weight, height, gender, goal, message } = workoutSolicitationBodySchema.parse(
    request.body
  )

  const workoutSolicitationUseCase = MakeWorkoutSolicitationUseCase()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `${message}`,
      },
    ],
  })

  const result = response.data.choices[0].message!.content

  await workoutSolicitationUseCase.execute({
    data: { age, weight, height, gender, goal, result },
  })

  return reply.status(200).send({ result })
}
