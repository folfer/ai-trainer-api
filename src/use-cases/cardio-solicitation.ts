import { CardioSolicitationsRepository } from "@/repositories/cardio-solicitations-repository";
import { CardioSolicitation } from "@prisma/client";

interface cardioSolicitationUseCaseRequest {
  data: {
    age: number;
    weight: number;
    height: number;
    cholesterol: number;
    diabetes: boolean;
    smoker: boolean;
    orthopedic_disfunction: string;
    respiratory_disfunction: string;
    cardio_disfunction: string;
    gender: string;
    level: string;
    goal: string;
    result: string;
    user_id: string;
  };
}

interface cardioSolicitationUseCaseResponse {
  cardioSolicitation: CardioSolicitation;
}

export class CardioSolicitationUseCase {
  constructor(private solicitationsRepository: CardioSolicitationsRepository) {}

  async execute({
    data,
  }: cardioSolicitationUseCaseRequest): Promise<cardioSolicitationUseCaseResponse> {
    const cardioSolicitation = await this.solicitationsRepository.create(data);

    return { cardioSolicitation };
  }
}
