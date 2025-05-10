"use client";
import React from "react";
import { Button } from "./ui/button";

interface StepperProps {
  steps: Record<number, React.ReactElement>;
  stepsLabels: Record<number, string>;
  currentStep: number;
  onNext: () => void;
  isNextDisabled?: boolean;
}

const Stepper = ({
  steps,
  stepsLabels,
  currentStep,
  onNext,
  isNextDisabled = false,
}: StepperProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center">
        {Object.keys(steps).map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                Number(step) <= currentStep
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              {step}
            </div>
            <div className="ms-2 text-sm font-medium text-gray-900 dark:text-white">
              {stepsLabels[Number(step)]}
            </div>
            {Number(step) < Object.keys(steps).length && (
              <div className="mx-4 h-0.5 w-8 bg-gray-200 dark:bg-gray-700"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">{steps[currentStep]}</div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={onNext}
          disabled={isNextDisabled}
          variant={"default"}

          // className="rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStep === Object.keys(steps).length
            ? "Complete Order"
            : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Stepper;
