'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface OnboardFormActionsProps {
  onPrevious: () => void;
  onSkip: () => void;
  isDisabled?: boolean;
  isShowSkip?: boolean;
  isShowPrevious?: boolean;
}

export const OnboardFormActions: React.FC<OnboardFormActionsProps> = ({
  onPrevious,
  onSkip,
  isDisabled = false,
  isShowSkip = true,
  isShowPrevious = true,
}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div>
        {isShowPrevious && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="w-full md:w-auto"
            disabled={isDisabled}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous step
            <span className="sr-only">Go to previous step</span>
          </Button>
        )}
      </div>
      <div>
        {isShowSkip && (
          <Button
            type="button"
            variant="link"
            onClick={onSkip}
            className="w-full md:w-auto mr-4"
            disabled={isDisabled}
          >
            Skip
            <span className="sr-only">Skip this step</span>
          </Button>
        )}
      </div>
      <Button type="submit" className="w-full md:w-auto" size="lg" disabled={isDisabled}>
        Continue to next step
        <span className="sr-only">Continue to next step</span>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
