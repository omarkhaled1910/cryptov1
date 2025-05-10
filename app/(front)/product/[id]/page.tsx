import { getProduct } from "@/app/actions/product";
import ProductDetailsWrapper from "../ProductDetailsWrapper";
import ProductNotExist from "../ProductNotExist";

const ProductDeatilsPage = async ({ params }: { params: { id: string } }) => {
  try {
    const { product } = await getProduct(params.id);
    return <ProductDetailsWrapper product={product} />;
  } catch (error) {
    return <ProductNotExist />;
  }
};

export default ProductDeatilsPage;
