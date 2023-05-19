import { WorkoutSolicitationsRepository } from '@/repositories/workout-solicitations-repository'
import { WorkoutSolicitation, } from '@prisma/client'

interface readByYoungestUseCaseRequest {
  userId: string
}
interface readByYoungestUseCaseResponse {
  workoutSolicitations: WorkoutSolicitation[]
}

export class ReadByYoungestWorkoutSolicitationsUseCase {

  constructor(private workoutSolicitationsRepository: WorkoutSolicitationsRepository) {}

  async execute({ userId }: readByYoungestUseCaseRequest): Promise<readByYoungestUseCaseResponse> {
    
    const workoutSolicitations = await this.workoutSolicitationsRepository.readByYoungest(userId)
    
    return { workoutSolicitations }
  }
} 
