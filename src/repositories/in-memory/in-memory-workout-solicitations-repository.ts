import { Prisma, WorkoutSolicitation } from '@prisma/client'
import { randomUUID } from 'crypto'
import { WorkoutSolicitationsRepository } from '../workout-solicitations-repository'

export class InMemoryWorkoutSolicitationsRepository implements WorkoutSolicitationsRepository {
  public items: WorkoutSolicitation[] = []

  async create(data: Prisma.WorkoutSolicitationCreateInput) {
    const workoutSolicitation = {
      id: randomUUID(),
      age: data.age,
      height: data.height,
      weight: data.weight,
      gender: data.gender,
      goal: data.goal,
      result: data.result,
      created_at: new Date(),
    }

    this.items.push(workoutSolicitation)

    return workoutSolicitation
  }
}
