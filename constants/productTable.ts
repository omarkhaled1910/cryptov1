export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  count: number;
  status: "inStock" | "outStock";
  category?: string;
  images?: string[];
  colors?: string[];
  tags?: string[];
  manfPrice: number;
  length: number;
  quantitySold: number;
  noOfOrders: number;
}
