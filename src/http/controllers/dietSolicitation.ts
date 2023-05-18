import { env } from '@/env'
import { MakeDietSolicitationUseCase } from '@/use-cases/factories/make-diet-solicitation-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Configuration, OpenAIApi } from 'openai'
import { number, string, z } from 'zod'

const configuration = new Configuration({
  organization: 'org-GS5lh0UtOYhBD8NXXv8XMWvU',
  apiKey: env.GPT_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function DietSolicitation(request: FastifyRequest, reply: FastifyReply) {
  const dietSolicitationBodySchema = z.object({
    age: z.number().min(1).max(100),
    weight: z.number(),
    height: z.number(),
    body_fat: z.optional(number()),
    allergy: z.optional(string()),
    lactose_intolerance: z.boolean(),
    gluten_intolerance: z.boolean(),
    diabetes: z.boolean(),
    hypertension: z.boolean(),
    gastritis: z.boolean(),
    cholesterol: number(),
    smoker: z.boolean(),
    vegan: z.boolean(),
    gender: z.enum(['Male', 'Female']),
    goal: z.enum(['hypertrophy', 'slimming']),
  })

  const {
    age,
    weight,
    height,
    body_fat,
    allergy,
    lactose_intolerance,
    gluten_intolerance,
    diabetes,
    hypertension,
    gastritis,
    cholesterol,
    smoker,
    vegan,
    gender,
    goal,
  } = dietSolicitationBodySchema.parse(request.body)

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

  const dietSolicitationUseCase = MakeDietSolicitationUseCase()

  const question = `Sou nutricionista esportivo,
  quero passar um plano alimentício para meu aluno e os 
  dados dele são: idade ${age}, peso ${weight}kg, altura ${height}m, ${translatedGender}, tem ${body_fat}% de gordura, 
  ${!smoker ? 'não' : ''} é fumante,
  ${!vegan ? 'não' : ''} é vegano,
  ${!hypertension ? 'não' : ''} é hipertenso, 
  ${!diabetes ? 'não' : ''} é diabético,
  ${!lactose_intolerance ? 'não' : ''} é lacto intolerante,
  ${!gluten_intolerance ? 'não' : ''} é celíaco, 
  ${!gastritis ? 'não' : ''} tem gastrite e 
  ${cholesterol < 170 ? 'não' : ''} tem colesterol alto.
  ${!!allergy ? `É alérgico a ${allergy}.` : ''}  
  Você poderia me passar uma dieta personalizada com esses dados visando ${translatedGoal}? Apenas para fins educacionais`

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

  await dietSolicitationUseCase.execute({
    data: {
      age,
      weight,
      height,
      body_fat,
      allergy,
      lactose_intolerance,
      gluten_intolerance,
      diabetes,
      hypertension,
      gastritis,
      cholesterol,
      smoker,
      vegan,
      gender,
      goal,
      result,
      user_id: request.user.sub
    },
  })

  return reply.status(200).send({ result })
}
