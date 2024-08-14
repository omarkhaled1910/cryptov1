import { HeroHighlightDemo } from "@/components/Hero";
import { MeteorsDemo } from "@/components/meteorsCard";
import { AnimatedModalDemo } from "@/components/Modal";
import { InfiniteMovingCardsDemo } from "@/components/MovingCards";
import { AnimatedPinDemo } from "@/components/PinCardLink";

import Image from "next/image";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // setStaticParamsLocale(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <HeroHighlightDemo />
      <InfiniteMovingCardsDemo />

      <AnimatedPinDemo />
      <h2 className=" text-center text-4xl my-6">Server Comp</h2>
      <MeteorsDemo />
      <br />
      <br />
      <br />
      <br />
    </main>
  );
}
