import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import GithubProvider from "next-auth/providers/github"
import { fauna } from '../../../services/fauna'
import { query as q } from 'faunadb'
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        authorization: {
          params: {
            scope: 'read:user',
          },
        },
      }),
    ],
//jwt: {
  //signingKey: process.env.SIGNING_KEY,
//},

    callbacks: {
      async signIn({ user, account, profile }) {
        const { email } = user
        
        try {
          await fauna.query(
            q.If(
              q.Not(
                q.Exists(
                  q.Match(
                    q.Index('user_data_email'),
                    q.Casefold(user.email)
                  )
                )
              ),
              q.Create(
                q.Collection('users'),
                { data: { email } }
              ),
              q.Get(
                q.Match(
                  q.Index('user_data_email'),
                  q.Casefold(user.email)
              )
            )
          )
          )
          return true

        } catch {
          return false
        }
      },
    }
})