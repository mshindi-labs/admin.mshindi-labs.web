import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
	className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
	return (
		<section
			className={cn(
				"flex flex-col items-center justify-center",
				"px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24 lg:py-32",
				"text-center",
				className,
			)}
		>
			<div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
				{/* Badge */}
				<div className="inline-flex items-center gap-2 rounded-full border bg-secondary/50 px-4 py-1.5 font-medium text-muted-foreground text-sm backdrop-blur-sm">
					<span className="relative flex size-2">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
						<span className="relative inline-flex size-2 rounded-full bg-primary" />
					</span>
					Administrative Excellence Platform
				</div>

				{/* Main Headline */}
				<h1 className="font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
					<span className="block text-foreground">Streamline Your</span>
					<span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						Organization
					</span>
				</h1>

				{/* Subheadline */}
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
					The modern administrative portal that empowers your team to work
					smarter, faster, and more efficiently. Built for scale, designed for
					excellence.
				</p>

				{/* CTA Buttons */}
				<div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
					<Button asChild size="lg" className="w-full min-w-[200px] sm:w-auto">
						<Link href="/auth/login">Get Started</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="w-full min-w-[200px] sm:w-auto"
					>
						<Link href="/dashboard">View Dashboard</Link>
					</Button>
				</div>

				{/* Trust Indicators */}
				<div className="pt-8 text-muted-foreground text-sm">
					<p>Trusted by leading organizations worldwide</p>
				</div>
			</div>
		</section>
	);
}
