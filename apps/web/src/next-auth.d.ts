import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			sid: string;
			uid: string;
			email: string;
		};
		accessToken: string;
		refreshToken: string;
	}

	interface User {
		sid: string;
		uid: string;
		access_token: string;
		refresh_token: string;
		sub?: string;
		email: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		sid: string;
		uid: string;
		accessToken: string;
		refreshToken: string;
		email: string;
	}
}
