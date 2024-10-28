import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useAuthContext } from "@/providers/auth-provider";
import { saveShippedDetail } from "@/app/actions/users";
import CircularProgress from "./ui/circular-progress";

const DeliveryDetails = ({
  currentShippingAdress,
  handleChooseShippingAdress,
}: any) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch, state } = useAuthContext();
  const handleSubmit = async (e: FormData) => {
    console.log(e.get("country"), e.get("strret"));
    const res = await saveShippedDetail(
      state.user_id,
      e,
      state.shippingDetails
    );
    console.log(res);
    res?.client?.shipping_Details &&
      handleChooseShippingAdress(
        res?.client?.shipping_Details[res?.client?.shipping_Details.length - 1]
      );

    const newShippindAdresses = res?.client?.shipping_Details.length
      ? [...res.client.shipping_Details]
      : [...state.shippingDetails];
    dispatch({
      type: "UPDATE_SHIPPING_DETAILS",
      payload: newShippindAdresses,
    });

    formRef.current?.reset();
    setLoading(false);
  };
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Delivery Details
      </h2>
      <div className=" my-8 flex flex-wrap gap-6">
        {state?.shippingDetails?.map((shippingDetail: any) => (
          <div
            key={shippingDetail?.id}
            onClick={() => handleChooseShippingAdress(shippingDetail)}
            className={cn(
              " cursor-pointer relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700",
              shippingDetail?.id === currentShippingAdress?.id
                ? " border-primary dark:border-white"
                : ""
            )}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {shippingDetail.street}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {shippingDetail.country} * {shippingDetail.city}
            </p>
          </div>
        ))}
      </div>
      <form ref={formRef} action={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <label
                  aria-label="select-country-input-3"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  Country*{" "}
                </label>
              </div>
              <Select name="country">
                <SelectTrigger className={cn("py-7")}>
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Egypt">Egypt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <label
                  aria-label="select-city-input-3"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  City*{" "}
                </label>
              </div>

              <Select name="city">
                <SelectTrigger className={cn("py-7")}>
                  <SelectValue placeholder="Select a City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dokki">Dokki</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <div className="mb-2 fcenterlex items- gap-2">
                <label
                  aria-label="select-city-input-3"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Street*
                </label>
              </div>
              <Input className="w-full" name="street" />
            </div>

            <div className="sm:col-span-2">
              <button
                onClick={() => setLoading(true)}
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                {loading ? (
                  <CircularProgress />
                ) : (
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h14m-7 7V5"
                    />
                  </svg>
                )}
                Add new address
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DeliveryDetails;
