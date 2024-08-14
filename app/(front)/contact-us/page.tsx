import { BackgroundBeamsDemo } from "@/components/BackGroundBeams";
import { WavyBackgroundDemo } from "@/components/WavyBg";
import React from "react";

const ContactUspage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  ">
      {/* <WavyBackgroundDemo /> */}
      <BackgroundBeamsDemo />
    </main>
  );
};

export default ContactUspage;
