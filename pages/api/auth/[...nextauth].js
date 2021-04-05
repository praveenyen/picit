import NextAuth from 'next-auth'
import { signIn } from 'next-auth/client'
import Providers from 'next-auth/providers'
import jwt from 'jsonwebtoken'
import axios from 'axios'
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.GitHub({
            clientId: 'a97fb881852d865537eb',
            clientSecret: 'bcf86cffb4bfa73bc20614792acd439cfb81c79f'
        }),
        Providers.Google({
            clientId: '853298365506-2a22c1d0nh1qbhlg14iat2c6in7qd8jp.apps.googleusercontent.com',
            clientSecret: 'goeEDn44oXqteKJVl5PmG0-I'
        })
    ],
    secret: process.env.SECRET,
    database: process.env.MONGODB_URI
})