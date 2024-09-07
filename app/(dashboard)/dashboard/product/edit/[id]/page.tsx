import ProductForm from "../../add/ProductForm";
import { editProduct, getProduct } from "@/app/actions/product";
import { getFormData } from "@/lib/utils";
import EditWrapper from "../EditWrapper";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const data = await getProduct(params.id);
  console.log(data, "edit page");
  return <EditWrapper id={params.id} product={data?.product || {}} />;
}
