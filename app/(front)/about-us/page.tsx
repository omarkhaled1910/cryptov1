import { InfiniteMovingCardsDemo } from "@/components/MovingCards";
import { AnimatedPinDemo } from "@/components/PinCardLink";
import { TimelineDemo } from "@/components/TimeLine";
import { WavyBackgroundDemo } from "@/components/WavyBg";
import React from "react";

const AboutUsPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  ">
      <WavyBackgroundDemo />
      <AnimatedPinDemo />
      <TimelineDemo />

      <InfiniteMovingCardsDemo />
    </main>
  );
};

export default AboutUsPage;
