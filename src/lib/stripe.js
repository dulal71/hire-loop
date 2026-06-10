import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID={
    'seeker_pro':'price_1TgpjVLgxyWg4tp9a3T4Uv6n',
    'seeker_premium':'price_1TgqnnLgxyWg4tp9IgUli5X0',
    'recruiter_enterprise':'price_1TgqpuLgxyWg4tp9xezvZLhE',
    'recruiter_growth':'price_1TgqoyLgxyWg4tp9VejzUFv3'

}