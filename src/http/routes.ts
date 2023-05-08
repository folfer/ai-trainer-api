import { FastifyInstance } from 'fastify'
import { WorkoutSolicitation } from './controllers/WorkoutSolicitation'
import { authenticate } from './controllers/authenticate'
import { register } from './controllers/register'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.post('/solicitations', { onRequest: [verifyJWT] }, WorkoutSolicitation)
}
