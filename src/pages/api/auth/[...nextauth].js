// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import { loginService } from '../../../services/authService'
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    debug: true,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Call the loginService function to authenticate

                const user = await loginService(credentials.username, credentials.password);

                // If authentication is successful, return the user
                if (user && user.messagecode === 0) {
                    const userRs = { username: credentials.username, data: user.data }
                    return userRs;
                } else {
                    throw new Error(user?.message);
                }
            }
        })
    ],
    session: {
        jwt: true, // Use JWT to store session data
    },
    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                token.username = user.username;
                token.token = user?.data || {}; // Store the token in the JWT
            }
            return token;
        },
        async session({session, token}) {
            session.user.username = token.username;
            session.user.token = token.token; // Store the token in the session
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login', // Customize the sign-in page URL
    }
});
