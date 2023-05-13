import { env } from '@/env'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
const stripe = require('stripe')(env.STRIPE_SECRET)

export async function payment(request: FastifyRequest, reply: FastifyReply) {
  const paymentBodySchema = z.object({
    amount: z.string(),
  })

  const { amount } = paymentBodySchema.parse(request.body)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return reply.status(200).send({ paymentIntent: paymentIntent.client_secret })
  } catch (err) {
    throw err
  }
}
