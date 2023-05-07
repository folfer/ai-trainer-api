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
  })

  const { age, weight, height, gender, goal } = workoutSolicitationBodySchema.parse(request.body)

  let translatedGender
  let translatedGoal

  if (goal === 'hypertrophy') {
    translatedGoal = 'hipertrofia'
  } else {
    translatedGoal = 'emagrecimento'
  }

  if (gender === 'Male') {
    translatedGender = 'homem'
  } else {
    translatedGender = 'mulher'
  }

  const workoutSolicitationUseCase = MakeWorkoutSolicitationUseCase()

  const question = `Sou personal trainer especialista em musculação,
  quero passar um plano de exercícios para meu aluno e os 
  dados dele são: idade ${age}, peso ${weight} kg, altura ${height}m, ${translatedGender}, tem 29% de gordura, 
  os objetivos é ${translatedGoal}, 
  não é fumante, não tem colesterol alto, 
  não tem problema cardiovascular, não tem problema respiratório, 
  não tem diabtes, não tem disfunção ortopédica e faz uso de suplementos termogênicos, 
  não pratica atividade física, 
  você poderia me passar uma tabela de treino abc de acordo com esses dados?`

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: question,
      },
    ],
  })

  const result = response.data.choices[0].message!.content

  const responseFormatted = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Consegue me gerar um json bem detalhado desse item: ${result}`,
      },
    ],
  })

  const resultFormatted = responseFormatted.data.choices[0].message!.content

  // await workoutSolicitationUseCase.execute({
  //   data: { age, weight, height, gender, goal, result },
  // })

  return reply.status(200).send({ result, resultFormatted })
}
