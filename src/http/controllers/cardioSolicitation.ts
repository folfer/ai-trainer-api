import { MakeCardioSolicitationUseCase } from '@/use-cases/factories/make-cardio-solicitation-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Configuration, OpenAIApi } from 'openai'
import { z } from 'zod'

const configuration = new Configuration({
  organization: 'org-GS5lh0UtOYhBD8NXXv8XMWvU',
  apiKey: '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',
})

const openai = new OpenAIApi(configuration)

export async function CardioSolicitation(request: FastifyRequest, reply: FastifyReply) {
  const cardioSolicitationBodySchema = z.object({
    age: z.number().min(1).max(100),
    weight: z.number(),
    height: z.number(),
    cholesterol: z.number(),
    diabetes: z.boolean(),
    hypertension: z.boolean(),
    smoker: z.boolean(),
    orthopedic_disfunction: z.string(),
    respiratory_disfunction: z.string(),
    cardio_disfunction: z.string(),
    gender: z.enum(['Male', 'Female']),
    goal: z.enum(['hypertrophy', 'slimming']),
  })

  const {
    age,
    weight,
    height,
    cholesterol,
    diabetes,
    hypertension,
    smoker,
    orthopedic_disfunction,
    respiratory_disfunction,
    cardio_disfunction,
    gender,
    goal,
  } = cardioSolicitationBodySchema.parse(request.body)

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

  const cardioSolicitationUseCase = MakeCardioSolicitationUseCase()

  const question = `Sou personal trainer especialista em musculação e emagrecimento,
  quero passar um plano de atividade aeróbica para um paciente e os 
  dados dele são: idade ${age}, peso ${weight}kg, altura ${height}m, ${translatedGender}, 
  o objetivos é ${translatedGoal}, 
  ${smoker ? 'é fumante,' : ''}
  ${diabetes ? 'é diabético,' : ''}
  ${hypertension ? 'é hipertenso,' : ''}
  ${cholesterol < 170 ? 'tem colesterol alto,' : ''}
  ${!!cardio_disfunction ? 'tem problema cardiovascular,' : ''}
  ${!!respiratory_disfunction ? 'tem problema respiratório,' : ''}
  ${!!orthopedic_disfunction ? 'tem problema ortopédico,' : ''} 
  não pratica atividade física, 
  você poderia me passar o plano em questão para fins de estudo e revisão da minha parte?`

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

  await cardioSolicitationUseCase.execute({
    data: {
      age,
      weight,
      height,
      cholesterol,
      diabetes,
      hypertension,
      smoker,
      orthopedic_disfunction,
      respiratory_disfunction,
      cardio_disfunction,
      gender,
      goal,
      result,
    },
  })

  return reply.status(200).send({ result })
}
