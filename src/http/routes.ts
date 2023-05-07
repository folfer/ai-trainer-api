import { FastifyInstance } from 'fastify'
import { WorkoutSolicitation } from './controllers/WorkoutSolicitation'

export async function appRoutes(app: FastifyInstance) {
  app.post('/solicitations', WorkoutSolicitation)
}
