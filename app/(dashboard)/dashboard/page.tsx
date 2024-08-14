import { HeroHighlightDemo } from "@/components/Hero";
import { InfiniteMovingCardsDemo } from "@/components/MovingCards";
import { DataTable } from "@/components/ProductTable";
import { columns, products } from "@/constants/productTable";
import Image from "next/image";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <DataTable columns={columns} data={products} />
    </main>
  );
}
