"use client";
import React, { useState } from "react";
import ProductForm from "../add/ProductForm";
import { Button } from "@/components/ui/button";
import { EyeIcon, TrashIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUploadImages } from "@/hooks/useUploadImages";
import { deleteProduct, editProduct } from "@/app/actions/product";
import { uploadImageToStorage } from "@/lib/utils";
import { toastColors } from "@/constants";
import Link from "next/link";
import { HttpStatusCode } from "axios";
import CircularProgress from "@/components/ui/circular-progress";

const EditWrapper = ({ id = "", product, tags }: any) => {
  const { toast } = useToast();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const imageUploadUtilities = useUploadImages(id, product);
  console.log(loading, " client wrapper", product);

  const handleEdit = async (data: FormData) => {
    console.log(
      imageUploadUtilities.files,
      imageUploadUtilities.items,
      data.getAll("colors")
    );
    const images: any = imageUploadUtilities.items.filter(
      (item: string) => !item.includes("blob:http://localhost")
    );
    await Promise.all(
      imageUploadUtilities.files?.map((file: Blob) =>
        uploadImageToStorage(file, (url) => images.push(url))
      )
    );
    console.log(images);
    const res = await editProduct(data, id, images);
    setLoading(false);

    if (res) {
      toast({
        title: "Product Edited Succesfully",
        style: { backgroundColor: toastColors.SUCESS },
      });
      push("/dashboard/products");
    } else {
      toast({
        title: "Check Your Connection",
        style: { backgroundColor: toastColors.FAIL },
      });
    }
  };
  const handleDelete = async (_: FormData) => {
    const res = await deleteProduct(id);
    setLoading(false);
    console.log(res);

    if (res.status == HttpStatusCode.Ok) {
      toast({
        title: "Product Deleted Succesfully",
        style: { backgroundColor: toastColors.SUCESS },
      });
      push("/dashboard/products");
    } else if (res.status == HttpStatusCode.NotFound) {
      toast({
        title: "Item Not Found",
        style: { backgroundColor: toastColors.FAIL },
      });
      push("/dashboard/products");
    } else {
      toast({
        title: "Check Your Connection",
        style: { backgroundColor: toastColors.FAIL },
      });
    }
  };
  return (
    <main className="mx-auto my-auto">
      <form action={handleDelete} className="flex flex-row-reverse py-4  gap-3">
        <Button type="submit" variant={"destructive"}>
          <TrashIcon />
        </Button>
        <Link href={`/product/${id}`}>
          <Button variant={"outline"}>
            <EyeIcon />
          </Button>
        </Link>
      </form>
      <form action={handleEdit} className="px-8  mb-4    ">
        <ProductForm
          initialVlaues={{ ...product }}
          imageUploadUtilities={{ ...imageUploadUtilities }}
          tags={tags}
        />
        <div className="flex items-center  mt-4">
          <Button
            className="w-full   md:max-w-80  mx-auto "
            variant={"secondary"}
            type="submit"
            onClick={() => setLoading(true)}
          >
            {loading ? <CircularProgress /> : "Edit Product"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default EditWrapper;
