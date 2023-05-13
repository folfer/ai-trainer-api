import { FastifyInstance } from 'fastify'
import { WorkoutSolicitation } from './controllers/workoutSolicitation'
import { authenticate } from './controllers/authenticate'
import { register } from './controllers/register'
import { verifyJWT } from './middlewares/verify-jwt'
import { DietSolicitation } from './controllers/dietSolicitation'
import { CardioSolicitation } from './controllers/cardioSolicitation'
import { payment } from './controllers/payment'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.post('/workouts', { onRequest: [verifyJWT] }, WorkoutSolicitation)

  app.post('/diets', { onRequest: [verifyJWT] }, DietSolicitation)

  app.post('/cardios', { onRequest: [verifyJWT] }, CardioSolicitation)

  app.post('/payments/intent', { onRequest: [verifyJWT] }, payment)
}
