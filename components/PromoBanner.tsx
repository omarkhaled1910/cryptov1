import Marquee from "react-fast-marquee";

export default function PromoBanner() {
  return (
    <Marquee className="bg-primary-foreground h-12" gradient={false} speed={50}>
      <span className="px-8 text-primary">Get 10% off on selected items</span>
      <div className="w-8 h-px bg-primary mx-2"></div>
      <span className="px-8 text-primary">
        New customers save 10% with the code GET10
      </span>
      {/* Add more items as needed */}
    </Marquee>
  );
}
