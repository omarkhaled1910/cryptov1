import React from "react";
const EmptyCart = ({
  renderCustomButton,
}: {
  renderCustomButton?: () => React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Big Shopping Cart SVG */}
      <svg
        className="w-64 h-64 mb-8 text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
        <path
          className="animate-pulse"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 8v4m0 0v4m0-4h4m-4 0H8"
          fill="none"
        />
      </svg>

      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-3">
        Your Cart is Empty
      </h2>

      {/* Description */}
      <p className="text-lg text-gray-600 max-w-md mb-8">
        Looks like you haven't added anything to your cart yet. Let's get you
        started!
      </p>

      <div className="flex flex-col gap-4">{renderCustomButton?.()}</div>
    </div>
  );
};

export default EmptyCart;
