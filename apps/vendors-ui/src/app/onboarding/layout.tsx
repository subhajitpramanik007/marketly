import { Metadata } from 'next';
import { OnboardingProvider } from '@/components/onboarding';

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Complete your onboarding process',
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
