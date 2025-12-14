import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface Feature {
	title: string;
	description: string;
	icon: React.ReactNode;
}

interface FeaturesSectionProps {
	className?: string;
}

const features: Feature[] = [
	{
		title: "Lightning Fast",
		description:
			"Built with cutting-edge technology for instant load times and seamless performance, even at scale.",
		icon: (
			<svg
				className="size-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M13 10V3L4 14h7v7l9-11h-7z"
				/>
			</svg>
		),
	},
	{
		title: "Secure by Default",
		description:
			"Enterprise-grade security with end-to-end encryption, role-based access control, and compliance built-in.",
		icon: (
			<svg
				className="size-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
				/>
			</svg>
		),
	},
	{
		title: "Intuitive Design",
		description:
			"A beautiful, modern interface that your team will actually enjoy using. No training required.",
		icon: (
			<svg
				className="size-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
				/>
			</svg>
		),
	},
	{
		title: "Real-time Collaboration",
		description:
			"Work together seamlessly with live updates, instant notifications, and synchronized workflows.",
		icon: (
			<svg
				className="size-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
				/>
			</svg>
		),
	},
	{
		title: "Powerful Analytics",
		description:
			"Make data-driven decisions with comprehensive dashboards, insights, and customizable reports.",
		icon: (
			<svg
				className="size-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
				/>
			</svg>
		),
	},
	{
		title: "Always Available",
		description:
			"99.9% uptime SLA with global infrastructure. Your team can work from anywhere, anytime.",
		icon: (
			<svg
				className="size-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
				/>
			</svg>
		),
	},
];

export function FeaturesSection({ className }: FeaturesSectionProps) {
	return (
		<section
			className={cn(
				"px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24",
				className
			)}
		>
			<div className="mx-auto max-w-7xl">
				{/* Section Header */}
				<div className="mb-12 text-center sm:mb-16 md:mb-20">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Everything You Need
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
						Powerful features designed to streamline your administrative
						workflows and boost productivity.
					</p>
				</div>

				{/* Features Grid */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<Card
							key={index}
							className="group transition-all hover:shadow-md hover:border-primary/20"
						>
							<CardHeader>
								<div className="mb-2 inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
									{feature.icon}
								</div>
								<CardTitle className="text-xl">{feature.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									{feature.description}
								</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
