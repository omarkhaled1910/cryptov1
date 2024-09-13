import ProductForm from "../../add/ProductForm";
import { editProduct, getProduct } from "@/app/actions/product";
import { getFormData } from "@/lib/utils";
import EditWrapper from "../EditWrapper";
import { getTags } from "@/app/actions/tags";

export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const data = await getProduct(params.id);
  const tags = await getTags();

  console.log(data, "edit page");
  return (
    <EditWrapper id={params.id} tags={tags} product={data?.product || {}} />
  );
}
