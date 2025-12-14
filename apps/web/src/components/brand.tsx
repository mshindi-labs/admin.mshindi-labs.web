import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandProps {
	className?: string;
	showLogo?: boolean;
	logoSize?: "sm" | "md" | "lg";
}

export function Brand({
	className,
	showLogo = true,
	logoSize = "md",
}: BrandProps) {
	const logoSizeClasses = {
		sm: "size-6",
		md: "size-8",
		lg: "size-10",
	};

	return (
		<Link
			href="/"
			className={cn(
				"flex items-center gap-2 sm:gap-3",
				"transition-opacity hover:opacity-80",
				"rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				className,
			)}
		>
			{showLogo && (
				<div
					className={cn(
						"flex items-center justify-center",
						"bg-primary/10 dark:bg-primary/20",
						"rounded-md",
						logoSizeClasses[logoSize],
					)}
					aria-hidden="true"
				>
					{/* Logo asset will be added here later */}
					<div className="font-semibold text-primary text-xs sm:text-sm">M</div>
				</div>
			)}
			<span className="font-semibold text-base text-foreground sm:text-lg">
				Mshindi Labs
			</span>
		</Link>
	);
}
