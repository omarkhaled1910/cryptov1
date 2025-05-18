"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import RelatedProducts from "@/components/RelatedProducts";

// Dummy data for demonstration
const categories = [
  {
    id: "glass",
    name: "Glass",
    image: "/flow23.webp",
    link: "?category=glass",
  },
  {
    id: "plastic",
    name: "Plastic",
    image: "/flow3.webp",
    link: "?category=plastic",
  },
  { id: "wood", name: "Wood", image: "/flow33.webp", link: "?category=wood" },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 90 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9 },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full">
        <Image
          src="/flow1.webp"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-4">
              Bring Beauty to Every Space
            </h1>
            <div className=" max-w-[480px] text-center">
              <p className="text-xl w-full  mb-8">
                Explore our premium collection of artificial flowers — perfect
                for home décor, events, weddings, offices, and more.
              </p>
            </div>
            <button className="animate-pulse rounded bg-primary-foreground text-primary px-4 py-2 font-bold hover:bg-primary-foreground/80">
              <Link href="/products">Shop Our Latest Collection</Link>
            </button>{" "}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible" // Triggers when scrolled into view
          viewport={{ once: true, margin: "-50px" }} // Only animate once, and trigger 50px before fully visible
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Link
                href={`/products${category.link}`}
                className="group relative h-64 rounded-lg overflow-hidden block"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <RelatedProducts tags={["featured"]} header={"Featured Products"} />
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/s.webp"
                alt="Special Offer 1"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">Summer Sale</h3>
                  <p className="text-lg">Up to 50% off on selected items</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/as.webp"
                alt="Special Offer 2"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
                  <p className="text-lg">Check out our latest products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
