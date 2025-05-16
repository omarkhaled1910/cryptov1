"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductItem from "@/components/ProductItem";
import { Product } from "@/constants/productTable";
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

// const featuredProducts: Product[] = [
//   {
//     id: "1",
//     name: "Premium Glass Vase",
//     price: 49.99,
//     category: "Glass",
//     count: 10,
//     images: ["/glass-vase.jpg"],
//     colors: ["#ffffff", "#000000"],
//     tags: ["glass", "home", "decor"],
//     status: "inStock",
//     description:
//       "A beautiful handcrafted glass vase perfect for home decoration",
//   },
//   {
//     id: "2",
//     name: "Eco-Friendly Plastic Chair",
//     price: 89.99,
//     category: "Plastic",
//     count: 5,
//     images: ["/plastic-chair.jpg"],
//     colors: ["#ffffff", "#000000"],
//     tags: ["plastic", "furniture"],
//     status: "inStock",
//     description: "Modern and sustainable plastic chair for your home or office",
//   },
//   {
//     id: "3",
//     name: "Handcrafted Wood Table",
//     price: 199.99,
//     category: "Wood",
//     count: 3,
//     images: ["/wood-table.jpg"],
//     colors: ["#8B4513", "#000000"],
//     tags: ["wood", "furniture"],
//     status: "inStock",
//     description: "Elegant wooden table made from premium quality materials",
//   },
//   // Add more products as needed
// ];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/flow1.webp"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
            <p className="text-xl mb-8">
              Discover amazing products for your home
            </p>
            <button className="animate-pulse rounded bg-primary-foreground text-primary px-4 py-2 font-bold hover:bg-primary-foreground/80">
              <Link href="/products">Shop Now</Link>
            </button>{" "}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products${category.link}`}
              className="group relative h-64 rounded-lg overflow-hidden"
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
          ))}
        </div>
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
