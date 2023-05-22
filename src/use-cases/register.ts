import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
  level: string;
  smoker: boolean;
  diabetes: boolean;
  physicalActivity: boolean;
  lactose_intolerance: boolean;
  gluten_intolerance: boolean;
  gastritis: boolean;
  cholesterol: number;
  body_fat?: number;
  allergy?: string;
  diet_price: string;
  orthopedic_disfunction: string;
  respiratory_disfunction: string;
  cardio_disfunction: string;
  goal: "hypertrophy" | "slimming" | "strengthEndurance" | "health";
  gender: "male" | "female";
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    age,
    weight,
    height,
    goal,
    gender,
    cholesterol,
    diabetes,
    diet_price,
    gastritis,
    gluten_intolerance,
    lactose_intolerance,
    level,
    physicalActivity,
    smoker,
    allergy,
    body_fat,
    cardio_disfunction,
    orthopedic_disfunction,
    respiratory_disfunction,
  }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      age,
      weight,
      height,
      goal,
      gender,
      cholesterol,
      diabetes,
      diet_price,
      gastritis,
      gluten_intolerance,
      lactose_intolerance,
      level,
      physicalActivity,
      smoker,
      allergy,
      body_fat,
      cardio_disfunction,
      orthopedic_disfunction,
      respiratory_disfunction,
    });

    return { user };
  }
}
