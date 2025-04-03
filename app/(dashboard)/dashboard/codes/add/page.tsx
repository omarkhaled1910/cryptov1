"use client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toastColors } from "@/constants";

import DiscountCodeForm from "./DiscountCodeForm";
import CircularProgress from "@/components/ui/circular-progress";
import { addDiscountCode } from "@/app/actions/codes";

const AddDiscountCodePage = () => {
  const { toast } = useToast();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const submitAdd = async (data: FormData) => {
    setLoading(true);
    console.log(data.get("validTo"), data.get("validFrom"));
    try {
      const res = await addDiscountCode(data);
      console.log(data.getAll("colors"), "handle add", res);

      if (res) {
        toast({
          title: "Dicount Code Created Succesfully",
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

  return (
    <main className="mx-auto my-auto">
      <form action={submitAdd} className="px-8  pb-8 mb-4    ">
        <DiscountCodeForm />
        <div className="flex items-center  mt-4">
          <Button
            className="w-full   md:max-w-80  mx-auto "
            variant={"secondary"}
            type="submit"
            onClick={() => setLoading(true)}
          >
            {loading ? <CircularProgress /> : "Add Discount Code"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default AddDiscountCodePage;
