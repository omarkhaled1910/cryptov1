"use client";
import { addProduct } from "@/app/actions/product";
import ProductForm from "./ProductForm";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toastColors } from "@/constants";
import { useUploadImages } from "@/hooks/useUploadImages";
import { uploadImageToStorage } from "@/lib/utils";
import DotsLoader from "@/components/ui/dost-loader";
import CircularProgress from "@/components/ui/circular-progress";

export default function AddWrapper({ tags }: { tags: string[] }) {
  const { toast } = useToast();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const imageUploadUtilities = useUploadImages();

  const submitAdd = async (data: FormData) => {
    console.log(data.getAll("tags"));
    const images: any = [];
    await Promise.all(
      imageUploadUtilities.files?.map((file: Blob) =>
        uploadImageToStorage(file, (url) => images.push(url))
      )
    );
    try {
      const res = await addProduct(data, images);
      console.log(data.getAll("colors"), "handle add", res);

      if (res) {
        toast({
          title: "Product Added Succesfully",
          style: { backgroundColor: toastColors.SUCESS },
        });
        push("/dashboard/products");
      } else {
        toast({
          title: "Check Your Connection",
          style: { backgroundColor: toastColors.FAIL },
        });
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <main className="mx-auto my-auto">
      <form
        id="product-form"
        action={submitAdd}
        className="px-8 pt-16 pb-8 mb-4    "
      >
        <ProductForm
          tags={tags}
          imageUploadUtilities={{ ...imageUploadUtilities }}
        />
        <div className="flex items-center  mt-4">
          <Button
            className="w-full   md:max-w-80  mx-auto "
            variant={"secondary"}
            type="submit"
            onClick={() => setLoading(true)}
          >
            {loading ? <CircularProgress /> : "Add Product"}
          </Button>
        </div>
      </form>
    </main>
  );
}
