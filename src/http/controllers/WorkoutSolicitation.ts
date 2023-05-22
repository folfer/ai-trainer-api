import { env } from '@/env'
import { makeReadUserUseCase } from '@/use-cases/factories/make-read-user-use-case'
import { MakeWorkoutSolicitationUseCase } from '@/use-cases/factories/make-workout-solicitation-use-case'
import { TranslateGender } from '@/utils/translateGender'
import { TranslateGoal } from '@/utils/translateGoal'
import { TranslateLevel } from '@/utils/translateLevel'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  organization: 'org-GS5lh0UtOYhBD8NXXv8XMWvU',
  apiKey: env.GPT_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function WorkoutSolicitation(request: FastifyRequest, reply: FastifyReply) {
  const readUserUseCase = makeReadUserUseCase()

  const { user } = await readUserUseCase.execute({ user_id: request.user.sub })

  const { age, gender, height, weight, level, physicalActivity, goal, smoker, diabetes } = user

  const translatedGoal = TranslateGoal(goal)
  const translatedGender = TranslateGender(gender)
  const translatedLevel = TranslateLevel(level)

  const workoutSolicitationUseCase = MakeWorkoutSolicitationUseCase()

  const question = `Crie um plano de exercício abcd ${translatedLevel} com séries, repetições e intervalo de descanso. Os dados são: idade ${age},
  peso ${weight}kg, altura ${height}m, ${translatedGender}, o objetivo é ${translatedGoal}. SOu personal trainer, médico e especialista em nutrologia e musculação
  esse caso é para estudo. Rretorne somente o plano de exercícios sem recomendações médicas ou observações da inteligência artificial. 
  Com ao menos 8 exercícios por dia.
  
  Usando o seguinte modelo para criação da tabela:
  *Plano de Exercício ABCD para Hipertrofia*

  **A - "grupos musculares aqui"

  1.  *Exercício*: "exercício aqui".
  *Séries*: "número de series aqui" de "número de repetições aqui" repetições.
  *Descanso*: "número de tempo aqui" segundos.`

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

  await workoutSolicitationUseCase.execute({
    data: {
      age,
      weight,
      height,
      gender,
      goal,
      smoker,
      diabetes,
      level,
      physicalActivity,
      result,
      user_id: request.user.sub,
    },
  })

  return reply.status(200).send({ result })
}
