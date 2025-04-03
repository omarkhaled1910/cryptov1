import { HeroHighlightDemo } from "@/components/Hero";
import { InfiniteMovingCardsDemo } from "@/components/MovingCards";
import Image from "next/image";

export default function ProductDetail({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      product details {params.id}
    </main>
  );
}
