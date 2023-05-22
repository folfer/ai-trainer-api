import { WorkoutSolicitationsRepository } from '@/repositories/workout-solicitations-repository'
import { WorkoutSolicitation } from '@prisma/client'

interface WorkoutSolicitationUseCaseRequest {
  data: {
    age: number
    weight: number
    height: number
    gender: string
    goal: string
    level: string
    smoker: boolean
    diabetes: boolean
    physicalActivity: boolean
    result: string
    user_id: string
  }
}

interface WorkoutSolicitationUseCaseResponse {
  workoutSolicitation: WorkoutSolicitation
}

export class WorkoutSolicitationUseCase {
  constructor(private solicitationsRepository: WorkoutSolicitationsRepository) {}

  async execute({
    data,
  }: WorkoutSolicitationUseCaseRequest): Promise<WorkoutSolicitationUseCaseResponse> {
    const workoutSolicitation = await this.solicitationsRepository.create(data)

    return { workoutSolicitation }
  }
}
