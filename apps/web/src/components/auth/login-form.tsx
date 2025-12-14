"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authenticate } from "@/app/auth/actions";
import { FormInput, FormProvider } from "@/components/form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type LoginFormData, loginSchema } from "@/lib/validations/auth";

export function LoginForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		setError(null);

		try {
			const result = await authenticate({
				email: data.email,
				password: data.password,
			});

			if (result.success) {
				router.refresh();
				window.location.reload();
			} else {
				setError(
					result.error || "Invalid email or password. Please try again.",
				);
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="border-border shadow-sm">
			<CardHeader className="space-y-1">
				<CardTitle className="font-semibold text-xl tracking-tight sm:text-2xl">
					Sign in
				</CardTitle>
				<CardDescription className="text-muted-foreground text-sm">
					Enter your email and password to access your account
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col">
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{error && (
							<div className="flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-destructive text-sm">
								<AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
								<span>{error}</span>
							</div>
						)}

						<FormInput
							form={form}
							name="email"
							label="Email or Username"
							type="text"
							placeholder="you@example.com"
							disabled={isLoading}
						/>

						<div>
							<div className="mb-2 flex items-center justify-between">
								<span className="font-medium text-sm">Password</span>
								<Link
									href={"/auth/forgot-password" as any}
									className="text-primary text-xs transition-colors hover:text-primary/90 sm:text-sm"
								>
									Forgot password?
								</Link>
							</div>
							<FormInput
								form={form}
								name="password"
								type="password"
								placeholder="••••••••"
								disabled={isLoading}
							/>
						</div>

						<Button
							type="submit"
							className="h-10 w-full sm:h-11"
							disabled={isLoading}
						>
							{isLoading ? "Signing in..." : "Sign in"}
						</Button>
					</form>
				</FormProvider>

				<div className="mt-4">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<Separator />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>

					<Button
						type="button"
						variant="outline"
						className="mt-4 h-10 w-full sm:h-11"
						disabled={isLoading}
					>
						<svg
							className="mr-2 h-5 w-5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
						</svg>
						Google
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
