import React from "react";

const Card = ({ title, amount, orders, bgColor, amountProcessed }) => {
  return (
    <div
      className={`${
        bgColor ? "bg-customBlue hover:bg-customBlueDeep " : "bg-white"
      } rounded-lg shadow-sm border min-w-[400px] h-fit`}
    >
      <div className="p-5">
        {/* Title Section */}
        <div
          className={`flex items-center gap-2 pb-2 ${
            bgColor ? "text-white" : "text-black"
          }`}
        >
          {title}

          {/* Question mark sign */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        {/* Amount Section */}
        <div className="flex justify-between ">
          <div
            className={`font-semibold text-3xl  ${
              bgColor ? "text-white" : "text-black"
            }`}
          >
            ₹ {amount}
          </div>

          {!amountProcessed && (
            <div
              className={`flex items-center text-blue-700 font-semibold underline underline-offset-4  ${
                bgColor ? "text-white" : "text-black"
              }`}
            >
              {orders}

              {/* Chevron right sign */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      {bgColor && (
        <div className="flex justify-between bg-customBlueDeep rounded-b-lg py-2 px-4 text-white">
          <span>Next Payment Date:</span>
          <span>Today, 4.00 PM</span>
        </div>
      )}
    </div>
  );
};

export default Card;
