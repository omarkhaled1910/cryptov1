import { BackgroundBeamsDemo } from "@/components/BackGroundBeams";
import { HeroHighlightDemo } from "@/components/Hero";
import { TypewriterEffectSmoothDemo } from "@/components/TypeWriterText";
import { WavyBackgroundDemo } from "@/components/WavyBg";
import React from "react";

const ContactUspage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  ">
      {/* <WavyBackgroundDemo /> */}
      <HeroHighlightDemo />
      <TypewriterEffectSmoothDemo />

      <BackgroundBeamsDemo />
    </main>
  );
};

export default ContactUspage;
