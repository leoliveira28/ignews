import { version } from 'react'
import Stripe from 'stripe'

export const stripe = new Stripe(
    process.env.NEXT_PUBLIC_PAYMENT_TOKEN,
    {
        apiVersion: '2020-08-27',
        appInfo: {
            name: 'Ignews',
            version
        },
    }
)