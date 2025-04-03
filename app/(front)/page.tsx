import { BackgroundBeamsWithCollisionDemo } from "@/components/BeamsCollider";
import { FocusCardsDemo } from "@/components/FocusCard";
import { HeroHighlightDemo } from "@/components/Hero";
import { MeteorsDemo } from "@/components/meteorsCard";
import { AnimatedModalDemo } from "@/components/Modal";
import { InfiniteMovingCardsDemo } from "@/components/MovingCards";
import { AnimatedPinDemo } from "@/components/PinCardLink";
import { CanvasRevealEffectDemo } from "@/components/RevealCards";
import { StickyScrollRevealDemo } from "@/components/StickyScroll";

import Image from "next/image";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // setStaticParamsLocale(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <BackgroundBeamsWithCollisionDemo />
      <CanvasRevealEffectDemo />
      <br />
      <br />
      <MeteorsDemo />
      <br />
      <br />
      <br />

      <FocusCardsDemo />
      <br />
      <br />
      <StickyScrollRevealDemo />
      <br />
      <br />
    </main>
  );
}
