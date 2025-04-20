import React from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
    steps: string[];
    currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
    return (
      <div className="flex items-center justify-between mb-8 px-4">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center space-y-2">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200",
                  index <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
              <span className="text-sm text-center max-w-[100px] truncate">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-muted mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  