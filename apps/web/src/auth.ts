import { create } from "@mshindi-labs/refetch";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
	API_CLIENT_ID,
	API_CLIENT_SECRET,
	BASE_API_URL,
} from "./constants/config";
import { API_ENDPOINTS } from "./constants/endpoints";

interface LoginResponse {
	id: string;
	email: string;
	sid: string;
	uid: string;
	access_token: string;
	refresh_token: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {
					label: "Email",
					type: "email",
				},
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials): Promise<LoginResponse | null> => {
				const api = create({
					baseURL: BASE_API_URL,
					headers: {
						Authorization: `Basic ${btoa(`${API_CLIENT_ID}:${API_CLIENT_SECRET}`)}`,
						"Content-Type": "application/json",
					},
				});

				const authResponse = await api.post<LoginResponse | null>(
					API_ENDPOINTS.AUTH.SIGN_IN,
					credentials,
				);

				if (authResponse.ok) {
					return authResponse.data ?? null;
				}
				throw new Error(authResponse.problem || "Failed to authenticate");
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			// Initial sign in - user object is available
			if (user) {
				token.sid = user.sid;
				token.uid = user.uid;
				token.accessToken = user.access_token;
				token.refreshToken = user.refresh_token;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			// Pass JWT properties to session
			if (token) {
				session.user.id = token.uid;
				session.user.sid = token.sid;
				session.user.uid = token.uid;
				session.user.email = token.email;
				session.accessToken = token.accessToken;
				session.refreshToken = token.refreshToken;
			}
			return session;
		},
	},
	cookies: {
		sessionToken: {
			name: "next-auth.session-token",
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: process.env.NODE_ENV === "production",
			},
		},
	},
	pages: {
		signIn: "/auth/login",
	},
});
