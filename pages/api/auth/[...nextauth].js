// /pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        console.log('Authorize called with credentials:', credentials);
        const user = { id: 1, name: 'admin', email: 'admin@example.com' };

        if (credentials.username === process.env.ADMIN_USERNAME && credentials.password === process.env.ADMIN_PASSWORD) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    }
  }
});
