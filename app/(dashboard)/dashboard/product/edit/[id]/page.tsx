import { HeroHighlightDemo } from "@/components/Hero";
import { InfiniteMovingCardsDemo } from "@/components/MovingCards";
import Image from "next/image";
import ProductForm from "../../add/ProductForm";
import { editProduct, getProduct } from "@/app/actions/product";
import { getFormData } from "@/lib/utils";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const handleEdit = async (data: FormData) => {
    "use server";

    await editProduct(getFormData(data), params.id);
  };
  const data = await getProduct(params.id);
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="w-full h-full bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto">
          <div className="flex justify-center px-6 py-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div
                className="w-full h-auto bg-gray-200 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{
                  backgroundImage:
                    'url("https://source.unsplash.com/Mv9hjnEUHR4/600x800") ',
                }}
              ></div>
              <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                  Edit product
                </h3>
                <form
                  action={handleEdit}
                  className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"
                >
                  <ProductForm initialVlaues={{ ...data?.product }} />
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Edit Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
