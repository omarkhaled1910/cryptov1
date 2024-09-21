import React from "react";
import OrderSummary from "./OrderSummary";
import DiscountCodeHandler from "./DiscountCodeHandler";
import DeliveryDetails from "./DeliveryDetails";
import Stepper from "./Stepper";

const CheckOutView = () => {
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <Stepper
              steps={{
                1: <DeliveryDetails />,
                2: <PaymentsMethods />,
                3: <DeliveryMethods />,
              }}
              stepsLabels={{
                1: "Delivery Details",
                2: "Payments Methods",
                3: "Delivery Methods",
              }}
            />
          </div>

          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <OrderSummary />
            <DiscountCodeHandler />

            <div className="space-y-3">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Proceed to Payment
              </button>

              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                One or more items in your cart require an account.{" "}
                <a
                  href="#"
                  title=""
                  className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Sign in or create an account now.
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckOutView;

const DeliveryMethods = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Delivery Methods
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="dhl"
                aria-describedby="dhl-text"
                type="radio"
                name="delivery-method"
                value=""
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                checked
              />
            </div>

            <div className="ms-4 text-sm">
              <label
                aria-label="dhl"
                className="font-medium leading-none text-gray-900 dark:text-white"
              >
                {" "}
                $15 - DHL Fast Delivery{" "}
              </label>
              <p
                id="dhl-text"
                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                Get it by Tommorow
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="fedex"
                aria-describedby="fedex-text"
                type="radio"
                name="delivery-method"
                value=""
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
            </div>

            <div className="ms-4 text-sm">
              <label
                aria-label="fedex"
                className="font-medium leading-none text-gray-900 dark:text-white"
              >
                {" "}
                Free Delivery - FedEx{" "}
              </label>
              <p
                id="fedex-text"
                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                Get it by Friday, 13 Dec 2023
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="express"
                aria-describedby="express-text"
                type="radio"
                name="delivery-method"
                value=""
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
            </div>

            <div className="ms-4 text-sm">
              <label className="font-medium leading-none text-gray-900 dark:text-white">
                {" "}
                $49 - Express Delivery{" "}
              </label>
              <p
                id="express-text"
                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                Get it today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentsMethods = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Payment
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="credit-card"
                aria-describedby="credit-card-text"
                type="radio"
                name="payment-method"
                value=""
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                checked
              />
            </div>

            <div className="ms-4 text-sm">
              <label
                aria-label="credit-card"
                className="font-medium leading-none text-gray-900 dark:text-white"
              >
                {" "}
                Credit Card{" "}
              </label>
              <p
                id="credit-card-text"
                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                Pay with your credit card
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Delete
            </button>

            <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="pay-on-delivery"
                aria-describedby="pay-on-delivery-text"
                type="radio"
                name="payment-method"
                value=""
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
            </div>

            <div className="ms-4 text-sm">
              <label
                aria-label="pay-on-delivery"
                className="font-medium leading-none text-gray-900 dark:text-white"
              >
                {" "}
                Payment on delivery{" "}
              </label>
              <p
                id="pay-on-delivery-text"
                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                +$15 payment processing fee
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Delete
            </button>

            <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="paypal-2"
                aria-describedby="paypal-text"
                type="radio"
                name="payment-method"
                value=""
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
            </div>

            <div className="ms-4 text-sm">
              <label
                aria-label="paypal-2"
                className="font-medium leading-none text-gray-900 dark:text-white"
              >
                {" "}
                Paypal account{" "}
              </label>
              <p
                id="paypal-text"
                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                Connect to your account
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Delete
            </button>

            <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
