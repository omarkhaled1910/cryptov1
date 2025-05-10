import axios from "axios";
import React from "react";
import { BackgroundBeamsWithCollisionDemo } from "@/components/BeamsCollider";
import { FocusCardsDemo } from "@/components/FocusCard";
import { HeroHighlightDemo } from "@/components/Hero";
import { MeteorsDemo } from "@/components/meteorsCard";
import { AnimatedModalDemo } from "@/components/Modal";
import { InfiniteMovingCardsDemo } from "@/components/MovingCards";
import { AnimatedPinDemo } from "@/components/PinCardLink";
import { CanvasRevealEffectDemo } from "@/components/RevealCards";
import { StickyScrollRevealDemo } from "@/components/StickyScroll";


const fetchPlemons = async () => {
  const result = await axios.get("https://pokeapi.co/api/v2/pokemon/");

  const allPokemos: any = {};

  for (let i = 0; i < result.data.results.length; i++) {
    const singelPok = await axios.get(result.data.results[i].url);

    allPokemos[result.data.results[i].url || ""] = singelPok.data;
  }
  return allPokemos;
};

const page = async () => {
  const pokemonsNames = await fetchPlemons();
  console.log(pokemonsNames);

  return (
    <main className="flex flex-col items-center justify-center py-40">
      {/* {pokemonsNames.data.results.map((res: any) => (
        <div key={res.url}>{res.name}</div>
      ))} */}

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
};

export default page;
