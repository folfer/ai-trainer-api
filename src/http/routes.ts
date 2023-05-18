import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { CardioSolicitation } from './controllers/cardioSolicitation'
import { DietSolicitation } from './controllers/dietSolicitation'
import { payment } from './controllers/payment'
import { readByYoungestDietSolicitations } from './controllers/readByYoungestDietSolicitations'
import { register } from './controllers/register'
import { WorkoutSolicitation } from './controllers/workoutSolicitation'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.post('/workouts', { onRequest: [verifyJWT] }, WorkoutSolicitation)

  app.post('/diets', { onRequest: [verifyJWT] }, DietSolicitation)

  app.get('/diets', { onRequest: [verifyJWT] }, readByYoungestDietSolicitations)

  app.post('/cardios', { onRequest: [verifyJWT] }, CardioSolicitation)

  app.post('/payments/intent', { onRequest: [verifyJWT] }, payment)
}
