import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { CtaSection } from "./cta-section";

interface LandingPageProps {
	className?: string;
}

export function LandingPage({ className }: LandingPageProps) {
	return (
		<div className={className}>
			<HeroSection />
			<FeaturesSection />
			<CtaSection />
		</div>
	);
}

export { HeroSection, FeaturesSection,  CtaSection };
