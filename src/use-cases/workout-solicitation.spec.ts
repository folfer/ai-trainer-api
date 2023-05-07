import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryWorkoutSolicitationsRepository } from '@/repositories/in-memory/in-memory-workout-solicitations-repository'
import { WorkoutSolicitationUseCase } from './workout-solicitation'

let workoutSolicitationsRepository: InMemoryWorkoutSolicitationsRepository
let sut: WorkoutSolicitationUseCase

describe('Workout Solicitation Use Case', () => {
  beforeEach(() => {
    workoutSolicitationsRepository = new InMemoryWorkoutSolicitationsRepository()
    sut = new WorkoutSolicitationUseCase(workoutSolicitationsRepository)
  })

  it('should be able create workout Solicitation', async () => {
    const { workoutSolicitation } = await sut.execute({
      data: {
        age: 12,
        gender: 'Male',
        height: 1.6,
        weight: 82.5,
        goal: 'hypertrophy',
        result: '',
      },
    })

    expect(workoutSolicitation.id).toEqual(expect.any(String))
  })
})
