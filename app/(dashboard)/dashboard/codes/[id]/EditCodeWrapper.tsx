"use client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toastColors } from "@/constants";

import CircularProgress from "@/components/ui/circular-progress";
import { deleteDiscountCode, editDiscountCode } from "@/app/actions/codes";
import DiscountCodeForm from "../add/DiscountCodeForm";
import { IDiscountCode } from "@/models/discount-codes";
import { TrashIcon } from "lucide-react";
import { HttpStatusCode } from "axios";

const EditCodeWrapper = ({
  id,
  initialVlaues,
}: {
  id: string;
  initialVlaues: IDiscountCode;
}) => {
  const { toast } = useToast();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  console.log(initialVlaues, "edit code");
  const submitEdit = async (data: FormData) => {
    setLoading(true);
    console.log(data.get("validTo"), data.get("validFrom"));
    try {
      const res = await editDiscountCode(id, data);
      console.log(data.getAll("colors"), "handle add", res);

      if (res) {
        toast({
          title: "Dicount Code Edited Succesfully",
          style: { backgroundColor: toastColors.SUCESS },
        });
        push("/dashboard/codes");
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
  const handleDelete = async () => {
    const res = await deleteDiscountCode(id);
    console.log(res);

    if (res.status == HttpStatusCode.Ok) {
      toast({
        title: "Discount Code Deleted Succesfully",
        style: { backgroundColor: toastColors.SUCESS },
      });
      push("/dashboard/codes");
    }
  };
  return (
    <main className="mx-auto my-auto">
      <form action={handleDelete} className="flex flex-row-reverse py-4  gap-3">
        <Button type="submit" variant={"destructive"}>
          <TrashIcon />
        </Button>
      </form>
      <form action={submitEdit} className="px-8  pb-8 mb-4    ">
        <DiscountCodeForm initialVlaues={initialVlaues} />
        <div className="flex items-center  mt-4">
          <Button
            className="w-full   md:max-w-80  mx-auto "
            variant={"secondary"}
            type="submit"
            onClick={() => setLoading(true)}
          >
            {loading ? <CircularProgress /> : "Edit Discount Code"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default EditCodeWrapper;
