import { env } from "@/env";
import { openai } from "@/lib/openai";
import { MakeCardioSolicitationUseCase } from "@/use-cases/factories/make-cardio-solicitation-use-case";
import { makeReadUserUseCase } from "@/use-cases/factories/make-read-user-use-case";
import { TranslateGender } from "@/utils/translateGender";
import { TranslateGoal } from "@/utils/translateGoal";
import { TranslateLevel } from "@/utils/translateLevel";
import { FastifyReply, FastifyRequest } from "fastify";

export async function CardioSolicitation(request: FastifyRequest, reply: FastifyReply) {
  const readUserUseCase = makeReadUserUseCase();

  const { user } = await readUserUseCase.execute({ user_id: request.user.sub });

  const { age, weight, height, cholesterol, diabetes, smoker, level, gender, goal, cardio_disfunction, orthopedic_disfunction, respiratory_disfunction } = user;

  const translatedGender = TranslateGender(gender);
  const translatedGoal = TranslateGoal(goal);
  const translatedLevel = TranslateLevel(level);

  const cardioSolicitationUseCase = MakeCardioSolicitationUseCase();

  const question = `Crie um plano de atividade aeróbica voltando para corrida ${translatedLevel} e os 
  dados são: idade ${age}, peso ${weight}kg, altura ${height}m, ${translatedGender}.
  Sou personal trainer, médico e especialista em emagrecimento, esse caso é para estudo, 
  retorne somente o plano de atividade aeróbica sem recomendações médicas ou observações da inteligência artificial.
  
  
  usando o seguinte modelo para criação do plano: 
  
  -   Objetivo:
      
      -   ${translatedGoal}
      
  -   Recomendações Gerais:
      
      -   Certifique-se de aquecer antes de cada sessão de corrida com "número aqui"  a "número aqui"  minutos de alongamentos dinâmicos.
      -   Use roupas e calçados adequados para corrida.
      -   Mantenha-se hidratado durante a atividade física, bebendo água antes, durante e após o treino.
      - 
  -   Plano de Atividade Aeróbica:
      -   Frequência semanal: "número aqui" sessões por semana, com pelo menos um dia de descanso entre cada sessão.
      
      Semana "número da semana aqui":
      
      -   Duração: "número aqui" minutos por sessão.
      -   Intensidade: Comece com uma corrida leve a moderada, mantendo um ritmo confortável.
      -   Estrutura da sessão: Inicie com "número aqui"  minutos de caminhada para aquecer. 
      Em seguida, alterne entre "número aqui"  minuto de corrida e "número aqui"  minuto de caminhada por "número aqui"  minutos. 
      Termine com "número aqui"  minutos de caminhada para esfriar.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
  });

  const result = response.choices[0].message.content;

  if (!result) {
    return reply.status(400).send({ message: "There was a problem processing your informations" });
  }

  await cardioSolicitationUseCase.execute({
    data: {
      age,
      weight,
      height,
      cholesterol,
      diabetes,
      smoker,
      level,
      gender,
      goal,
      result,
      cardio_disfunction,
      orthopedic_disfunction,
      respiratory_disfunction,
      user_id: request.user.sub,
    },
  });

  return reply.status(200).send({ result });
}
