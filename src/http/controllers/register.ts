import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    age: z.coerce.number(),
    height: z.coerce.number(),
    weight: z.coerce.number(),
    goal: z.enum(["hypertrophy", "slimming", "strengthEndurance", "health"]),
    gender: z.enum(["male", "female"]),
    level: z.enum(["starter", "intermediary", "advanced"]),
    smoker: z.boolean(),
    diabetes: z.boolean(),
    physicalActivity: z.boolean(),
    lactose_intolerance: z.boolean(),
    gluten_intolerance: z.boolean(),
    gastritis: z.boolean(),
    cholesterol: z.coerce.number(),
    body_fat: z.coerce.number(),
    allergy: z.string(),
    diet_price: z.enum(["cheap", "expensive"]),
    cardio_disfunction: z.string(),
    orthopedic_disfunction: z.string(),
    respiratory_disfunction: z.string(),
  });

  const {
    name,
    email,
    password,
    age,
    weight,
    height,
    goal,
    gender,
    cholesterol,
    allergy,
    body_fat,
    diabetes,
    diet_price,
    gastritis,
    gluten_intolerance,
    lactose_intolerance,
    level,
    physicalActivity,
    smoker,
    cardio_disfunction,
    orthopedic_disfunction,
    respiratory_disfunction,
  } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
      age,
      weight,
      height,
      goal,
      gender,
      cholesterol,
      allergy,
      body_fat,
      diabetes,
      diet_price,
      gastritis,
      gluten_intolerance,
      lactose_intolerance,
      level,
      physicalActivity,
      smoker,
      cardio_disfunction,
      orthopedic_disfunction,
      respiratory_disfunction,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
