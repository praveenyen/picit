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
    session: {
        jwt: true
    },
    jwt: {
        secret: process.env.SECRET,
        encode: async ({ secret, token, maxAge }) => {
            const jwtClaims = {
                "sub": token.sub.toString(),
                "name": token.name,
                "email": token.email,
                "iat": Date.now() / 1000,
                "exp": Math.floor(Date.now() / 1000) + (24 * 60 * 60)
            }
            const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: 'HS256' });
            return encodedToken;
        },
        decode: async ({ secret, token, maxAge }) => {
            const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256'] });
            return decodedToken;
        },
    },
    callbacks: {
        async signIn(user, account, profile) {
            return true;
        },
        async session(session, token) {
            const encodedToken = jwt.sign(token, process.env.SECRET, { algorithm: 'HS256' });
            session.id = token.id;
            session.token = encodedToken;
            return Promise.resolve(session);
        },
        async jwt(token, user, account, profile, isNewUser) {
            const isUserSignedIn = user ? true : false;
            if (isUserSignedIn) {
                token.id = user.id.toString();
            }
            return Promise.resolve(token);
        }
    }
})