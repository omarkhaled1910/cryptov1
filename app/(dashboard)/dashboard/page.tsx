import { getProducts } from "@/app/actions/product";
import { DataTable } from "@/components/ProductTable";
import { columns, products } from "@/constants/productTable";
import { PlusSquare } from "lucide-react";

export default function Dashboard() {
  return (
    <main className="flex  flex-col py-4   ">
      <div className="flex justify-between w-full ">
        <h2 className=" text-xl text-center">Our Products</h2>
        <a href="product/add">
          <PlusSquare className=" h-9 w-9 cursor-pointer" />
        </a>
      </div>
      <br />
      <div
        style={{ maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}
        className=" rounded-md   bg-zinc-100 dark:bg-zinc-900 space-x-4"
      >
        <DataTable
          fetcher={getProducts}
          accssKey={"product"}
          columns={columns}
          data={products}
        />
      </div>
    </main>
  );
}
