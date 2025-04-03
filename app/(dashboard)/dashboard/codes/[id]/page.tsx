import React from "react";
import EditCodeWrapper from "./EditCodeWrapper";
import { getSingleDiscountCode } from "@/app/actions/codes";

const EditDiscountPage = async ({ params }: { params: { id: string } }) => {
  const data = await getSingleDiscountCode(params.id);
  console.log(data);
  return <EditCodeWrapper initialVlaues={data.discountCode} id={params.id} />;
};

export default EditDiscountPage;
