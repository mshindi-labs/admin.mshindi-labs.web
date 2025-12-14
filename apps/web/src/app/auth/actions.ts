"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export async function authenticate(credentials: {
	email: string;
	password: string;
}) {
	try {
		await signIn("credentials", {
			email: credentials.email,
			password: credentials.password,
			redirect: false,
		});

		return { success: true, error: null };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { success: false, error: "Invalid email or password." };
				default:
					return { success: false, error: "Something went wrong." };
			}
		}
		throw error;
	}
}

export async function logout() {
	await signOut({ redirectTo: "/" });
}
