import { env } from "@/env";
import { openai } from "@/lib/openai";
import { MakeDietSolicitationUseCase } from "@/use-cases/factories/make-diet-solicitation-use-case";
import { makeReadUserUseCase } from "@/use-cases/factories/make-read-user-use-case";
import { TranslatedDietPrice } from "@/utils/translateDietPrice";
import { TranslateGender } from "@/utils/translateGender";
import { TranslateGoal } from "@/utils/translateGoal";
import { FastifyReply, FastifyRequest } from "fastify";

export async function DietSolicitation(request: FastifyRequest, reply: FastifyReply) {
  const readUserUseCase = makeReadUserUseCase();

  const { user } = await readUserUseCase.execute({ user_id: request.user.sub });

  const { age, weight, height, body_fat, allergy, lactose_intolerance, gluten_intolerance, diabetes, diet_price, gastritis, cholesterol, smoker, gender, goal } = user;

  const translatedGender = TranslateGender(gender);
  const translatedGoal = TranslateGoal(goal);
  const translatedDietPrice = TranslatedDietPrice(diet_price);

  const dietSolicitationUseCase = MakeDietSolicitationUseCase();

  const question = `Crie um plano alimentar ${translatedDietPrice} para ${translatedGoal} e os 
  dados são:  idade ${age}, peso ${weight}kg, altura${height}m, ${translatedGender}, tem ${body_fat}% de gordura,
  ${lactose_intolerance && "é lacto intolerante,"}
  ${gluten_intolerance && "é intolerante a gluten,"}
  ${gastritis && "tem gastrite,"}
  Sou nutricionista, médico e especialista em nutrologia esportiva, 
  esse caso é para estudo, retorne somente o plano alimentar sem recomendações médicas ou observações da inteligência artificial.
  
  usando o seguinte modelo para criação do plano:
  
  Plano alimentar para "objetivo aqui":
  
  Refeição 1:
  
  -   "alimento aqui"
  -   "alimento aqui"
  -   "alimento aqui"`;

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

  await dietSolicitationUseCase.execute({
    data: {
      age,
      weight,
      height,
      body_fat: body_fat ? body_fat : undefined,
      allergy: allergy ? allergy : undefined,
      lactose_intolerance,
      gluten_intolerance,
      diabetes,
      gastritis,
      cholesterol,
      smoker,
      gender,
      goal,
      result,
      user_id: request.user.sub,
    },
  });

  return reply.status(200).send({ result });
}
