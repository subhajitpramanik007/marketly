'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type PreviousActionProps =
  | {
      isShowPrevious?: true;
      onPrevious: () => void;
    }
  | {
      isShowPrevious?: false;
      onPrevious?: undefined;
    };

type SkipActionProps =
  | {
      isShowSkip: true;
      onSkip: () => void;
    }
  | {
      isShowSkip?: false;
      onSkip?: undefined;
    };

// Final union type
export type OnboardFormActionsProps = {
  isDisabled?: boolean;
  onNext: () => void;
} & PreviousActionProps &
  SkipActionProps;

export const OnboardFormActions: React.FC<OnboardFormActionsProps> = ({
  onPrevious,
  onSkip,
  isDisabled = false,
  isShowSkip = false,
  isShowPrevious = false,
  onNext,
}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="basis-1/3">
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
            Skip for now
            <span className="sr-only">Skip this step</span>
          </Button>
        )}
      </div>
      <Button
        onClick={onNext}
        type="button"
        className="w-full md:w-auto basis-1/3"
        size="lg"
        disabled={isDisabled}
      >
        Continue to next step
        <span className="sr-only">Continue to next step</span>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
