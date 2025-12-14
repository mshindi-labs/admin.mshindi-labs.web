"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Header() {
	const pathname = usePathname();

	// Hide header on dashboard routes (dashboard has its own navbar)
	const isDashboardRoute = pathname?.startsWith("/dashboard");
	const isAuthRoute = pathname?.startsWith("/auth");

	if (isDashboardRoute) {
		return null;
	}

	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
			)}
		>
			<div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 md:px-8">
				<Brand />
				<nav className="hidden items-center gap-6 sm:flex">
					<Link
						href="/"
						className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
					>
						Features
					</Link>
					<Link
						href="/dashboard"
						className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
					>
						Dashboard
					</Link>
				</nav>
				<div className="flex items-center gap-2 sm:gap-4">
					{!isAuthRoute && (
						<Button
							asChild
							variant="ghost"
							size="sm"
							className="hidden sm:flex"
						>
							<Link href="/auth/login">Sign In</Link>
						</Button>
					)}
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
