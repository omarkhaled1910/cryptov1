"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

const Stepper = ({
  steps,
  stepsLabels,
  disableNext,
}: {
  steps: Record<number, JSX.Element>;
  stepsLabels: Record<number, string>;
  disableNext?: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const totalSteps = Object.entries(steps).length; // Adjust if you have more steps

  const handleNext = () => {
    if (currentIndex < totalSteps) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    // Handle finish action
    alert("Finished!");
  };

  return (
    <div>
      <div data-hs-stepper={`{"currentIndex": ${currentIndex}}`}>
        <ul className="relative flex flex-row gap-x-2">
          {[...Array(totalSteps)].map((_, index) => (
            <li
              key={index}
              className={`flex items-center gap-x-2 shrink basis-0 flex-1 group ${
                currentIndex > index + 1
                  ? "success"
                  : currentIndex === index + 1
                  ? "active"
                  : ""
              }`}
              data-hs-stepper-nav-item={`{"index": ${
                index + 1
              }, "isCompleted": ${currentIndex > index + 1}}`}
            >
              <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                <span
                  className={`size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full ${
                    currentIndex > index + 1
                      ? "hs-stepper-completed:bg-teal-500"
                      : currentIndex === index + 1
                      ? "hs-stepper-active:bg-blue-600"
                      : ""
                  }`}
                >
                  <span
                    className={`hs-stepper-success:hidden hs-stepper-completed:hidden`}
                  >
                    {index + 1}
                  </span>
                  <svg
                    className={`hidden shrink-0 size-3 hs-stepper-success:block`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="ms-2 text-sm font-medium text-primary">
                  {stepsLabels?.[index + 1]}
                </span>
              </span>
              <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
            </li>
          ))}
        </ul>

        <div className="mt-5 sm:mt-8">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              data-hs-stepper-content-item={`{"index": ${index + 1}}`}
              style={{ display: currentIndex === index + 1 ? "block" : "none" }}
            >
              {steps[currentIndex]}
            </div>
          ))}

          <div className="mt-5 flex justify-between items-center gap-x-2">
            <Button
              variant={"outline"}
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800"
              onClick={handleBack}
              disabled={currentIndex === 1}
            >
              Back
            </Button>
            {currentIndex !== totalSteps && (
              <Button
                disabled={disableNext}
                variant={"default"}
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            {currentIndex === totalSteps && (
              <Button
                disabled={disableNext}
                variant={"default"}
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white"
                onClick={handleFinish}
              >
                Finish
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
