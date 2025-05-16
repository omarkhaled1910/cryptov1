import React from "react";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
        Payment Method
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="credit-card"
                aria-describedby="credit-card-text"
                type="radio"
                name="payment-method"
                value="credit-card"
                checked={paymentMethod === "credit-card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 border-gray-300 bg-white text-slate-900 focus:ring-2 focus:ring-slate-900 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-slate-900"
              />
            </div>
            <div className="ms-4 text-sm">
              <label className="font-medium leading-none text-slate-900 dark:text-white">
                Credit Card
              </label>
              <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                Pay with your credit card
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="pay-on-delivery"
                aria-describedby="pay-on-delivery-text"
                type="radio"
                name="payment-method"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 border-gray-300 bg-white text-slate-900 focus:ring-2 focus:ring-slate-900 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-slate-900"
              />
            </div>
            <div className="ms-4 text-sm">
              <label className="font-medium leading-none text-slate-900 dark:text-white">
                Payment on delivery
              </label>
              <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                +$15 payment processing fee
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="paypal"
                aria-describedby="paypal-text"
                type="radio"
                name="payment-method"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 border-gray-300 bg-white text-slate-900 focus:ring-2 focus:ring-slate-900 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-slate-900"
              />
            </div>
            <div className="ms-4 text-sm">
              <label className="font-medium leading-none text-slate-900 dark:text-white">
                Paypal account
              </label>
              <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                Connect to your account
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
