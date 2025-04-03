"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { Button } from "./ui/button";

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem]  w-full rounded-md bg-slate-200 dark:bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 space-y-5">
        <h1 className="relative  text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative ">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you&apos;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p>
        <input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border border-neutral-800   w-full relative z-10 mt-4 bg-slate-300 dark:bg-neutral-950 placeholder:text-neutral-700 p-3"
        />
        <div className="flex items-center justify-center w-full cursor-pointer">
          <Button
            className="my-4 py-6 text-center w-full cursor-pointer "
            variant={"outline"}
            type="submit"
          >
            Send
          </Button>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
