import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth";

export const metadata: Metadata = {
	title: "Sign In - Admin mshindi Labs",
	description: "Sign in to your Admin mshindi Labs account",
};

export default function LoginPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LoginForm />
		</Suspense>
	);
}
