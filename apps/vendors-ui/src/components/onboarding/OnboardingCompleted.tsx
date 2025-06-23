import { Card, CardContent } from '../ui/card';

export const OnboardingCompleted = () => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardContent className="flex-1 overflow-y-auto space-x-8">
        <div>
          <h1 className="text-2xl font-bold">Onboarding Completed</h1>
        </div>

        <div>
          <p className="text-muted-foreground">You have completed the onboarding process</p>
        </div>
      </CardContent>
    </Card>
  );
};
