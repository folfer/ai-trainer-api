import { DietSolicitationsRepository } from '@/repositories/diet-solicitations-repository'
import { DietSolicitation } from '@prisma/client'

interface dietSolicitationUseCaseRequest {
  data: {
    age: number
    weight: number
    height: number
    body_fat?: number
    allergy?: string
    lactose_intolerance: boolean
    gluten_intolerance: boolean
    diabetes: boolean
    hypertension: boolean
    gastritis: boolean
    cholesterol: number
    smoker: boolean
    vegan: boolean
    gender: 'Male' | 'Female'
    goal: 'hypertrophy' | 'slimming'
    result: string
  }
}

interface dietSolicitationUseCaseResponse {
  dietSolicitation: DietSolicitation
}

export class DietSolicitationUseCase {
  constructor(private solicitationsRepository: DietSolicitationsRepository) {}

  async execute({
    data,
  }: dietSolicitationUseCaseRequest): Promise<dietSolicitationUseCaseResponse> {
    const dietSolicitation = await this.solicitationsRepository.create(data)

    return { dietSolicitation }
  }
}
