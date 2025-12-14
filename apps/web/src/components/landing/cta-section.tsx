import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaSectionProps {
	className?: string;
}

export function CtaSection({ className }: CtaSectionProps) {
	return (
		<section
			className={cn(
				"px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24",
				className
			)}
		>
			<div className="mx-auto max-w-4xl">
				<div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center sm:p-12 md:p-16">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Ready to Transform Your Organization?
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
						Join thousands of teams already using our platform to streamline
						their administrative workflows.
					</p>
					<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
						<Button asChild size="lg" className="w-full sm:w-auto min-w-[200px]">
							<Link href="/auth/login">Get Started Free</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="w-full sm:w-auto min-w-[200px]"
						>
							<Link href="/dashboard">Schedule Demo</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
