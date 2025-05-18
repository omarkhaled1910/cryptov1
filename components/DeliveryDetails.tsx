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
import {
  addShippingAddress,
  deleteShippingAddress,
} from "@/app/actions/client";
import CircularProgress from "./ui/circular-progress";
import { Button } from "./ui/button";

const DeliveryDetails = ({
  currentShippingAdress,
  handleChooseShippingAdress,
}: any) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(
    null
  );
  const { dispatch, state } = useAuthContext();
  const [formValues, setFormValues] = useState({
    city: "",
    buildingNumber: "",
    floor: "",
    apartment: "",
    street: "",
  });

  const isFormValid = Object.values(formValues).every(
    (value) => value.trim() !== ""
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormData) => {
    try {
      setLoading(true);
      const address = {
        city: e.get("city"),
        buildingNumber: e.get("buildingNumber"),
        floor: e.get("floor"),
        apartment: e.get("apartment"),
        street: e.get("street"),
      };

      const res = await addShippingAddress(state.user_id, address);

      if (res?.shipping_Details) {
        const newAddress =
          res.shipping_Details[res.shipping_Details.length - 1];
        handleChooseShippingAdress(newAddress);
        dispatch({
          type: "UPDATE_SHIPPING_DETAILS",
          payload: res.shipping_Details,
        });
      }

      formRef.current?.reset();
      setFormValues({
        city: "",
        buildingNumber: "",
        floor: "",
        apartment: "",
        street: "",
      });
    } catch (error) {
      console.error("Error adding shipping address:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      setDeletingAddressId(addressId);
      const res = await deleteShippingAddress(state.user_id, addressId);
      if (res?.shipping_Details) {
        dispatch({
          type: "UPDATE_SHIPPING_DETAILS",
          payload: res.shipping_Details,
        });
        if (currentShippingAdress?.id === addressId) {
          handleChooseShippingAdress(null);
        }
      }
    } catch (error) {
      console.error("Error deleting shipping address:", error);
    } finally {
      setDeletingAddressId(null);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Delivery Details
      </h2>
      <div className="my-8 flex flex-wrap gap-6">
        {state?.shippingDetails.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="block">No Addresses Found</p>
            <p>Add a new address</p>
          </div>
        ) : (
          state?.shippingDetails?.map((shippingDetail: any) => (
            <div
              key={shippingDetail?.id}
              className={cn(
                "cursor-pointer relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700",
                shippingDetail?.id === currentShippingAdress?.id
                  ? "border-primary dark:border-white"
                  : ""
              )}
            >
              <div className="flex justify-between items-start">
                <div onClick={() => handleChooseShippingAdress(shippingDetail)}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {shippingDetail.street}
                  </h5>
                  <div className="space-y-1">
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Building {shippingDetail.buildingNumber}, Floor{" "}
                      {shippingDetail.floor}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Apartment {shippingDetail.apartment}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {shippingDetail.city}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteAddress(shippingDetail.id)}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={deletingAddressId === shippingDetail.id}
                >
                  {deletingAddressId === shippingDetail.id ? (
                    <CircularProgress />
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <form ref={formRef} action={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <label
                  aria-label="select-city-input-3"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  City*
                </label>
              </div>

              <Select
                name="city"
                onValueChange={(value) =>
                  handleInputChange({ target: { name: "city", value } } as any)
                }
              >
                <SelectTrigger className={cn("py-7")}>
                  <SelectValue placeholder="Select a City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dokki">Dokki</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <label
                  aria-label="building-number-input"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Building Number*
                </label>
              </div>
              <Input
                className="w-full"
                name="buildingNumber"
                value={formValues.buildingNumber}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <label
                  aria-label="floor-input"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Floor*
                </label>
              </div>
              <Input
                className="w-full"
                name="floor"
                value={formValues.floor}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <label
                  aria-label="apartment-input"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Apartment*
                </label>
              </div>
              <Input
                className="w-full"
                name="apartment"
                value={formValues.apartment}
                onChange={handleInputChange}
              />
            </div>

            <div className="sm:col-span-2">
              <div className="mb-2 flex items-center gap-2">
                <label
                  aria-label="street-input"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Street*
                </label>
              </div>
              <Input
                className="w-full"
                name="street"
                value={formValues.street}
                onChange={handleInputChange}
              />
            </div>

            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14m-7 7V5"
                    />
                  </svg>
                )}
                Save Address
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DeliveryDetails;
