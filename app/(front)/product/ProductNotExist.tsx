import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductNotExist = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4">
      <h1 className="text-2xl font-bold text-foreground">Product Not Found</h1>
      <p className="text-muted-foreground text-center">
        The product you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/products">Back to Products</Link>
      </Button>
    </div>
  );
};

export default ProductNotExist;
