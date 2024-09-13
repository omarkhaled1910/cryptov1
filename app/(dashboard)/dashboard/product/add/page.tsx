import { editProduct, getProduct } from "@/app/actions/product";
import { getFormData } from "@/lib/utils";
import AddWrapper from "./AddWrapper";
import { getTags } from "@/app/actions/tags";

export default async function AddProduct({
  params,
}: {
  params: { id: string };
}) {
  const data = await getTags();
  console.log(data, "add page");
  return <AddWrapper tags={data || []} />;
}
