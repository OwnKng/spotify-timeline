import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const { CLIENT_ID, CLIENT_SECRET } = process.env

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      scope: 'user-library-read',
    }),
  ],
  callbacks: {
    async jwt(token, _, account) {
      if (account) {
        token.id = account.id
        token.accessToken = account.accessToken
        token.refreshToken = account.refreshToken
      }
      return token
    },
    async session(session, user) {
      session.user = user
      return session
    },
  },
})
