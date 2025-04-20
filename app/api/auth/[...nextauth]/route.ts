import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { BACKEND_URL, HOURS_SESSION } from "@/app/api/common/api-client/app.api";

/**
 * Configuration options for NextAuth.
 * @type {NextAuthOptions}
 */
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      /**
       * Authorize user credentials.
       * @param {Object} credentials - The user credentials.
       * @param {string} credentials.email - The user's email.
       * @param {string} credentials.password - The user's password.
       * @returns {Promise<Object|null>} The user object if credentials are valid, otherwise null.
       * @throws {Error} If email or password is missing or invalid.
       */
      async authorize(credentials) {
        try {
        if (!credentials?.email || !credentials?.password) throw new Error("Por favor, ingresa email y contraseña");
        const res = await fetch(`${BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        if (!res.ok) {
          const errorData = await res.text();
          console.error('Auth Error Response:', errorData);
          throw new Error("Credenciales inválidas");
        }
        const data = await res.json();
        if (!data) throw new Error("No se recibió respuesta del servidor");
        return {...data.user, access_token: data.access_token};
      } catch (error) {
          console.error('Auth Error:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    /**
     * Callback to handle JWT token.
     * @param {Object} params - The parameters.
     * @param {Object} params.token - The JWT token.
     * @param {Object} [params.user] - The user object.
     * @returns {Promise<Object>} The modified token.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.access_token = user.access_token;
      }
      return token;
    },
    /**
     * Callback to handle session.
     * @param {Object} params - The parameters.
     * @param {Object} params.session - The session object.
     * @param {Object} params.token - The JWT token.
     * @returns {Promise<Object>} The modified session.
     */
    async session({ session, token }) {
      // Propagate token data to the session
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          role: token.role,
        };
        session.access_token = token.access_token as string; // Include access_token in the session
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: HOURS_SESSION * 60 * 60, // 2 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * NextAuth handler for authentication.
 */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };