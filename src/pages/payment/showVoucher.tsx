import React, { useEffect } from "react";

const ShowVoucher = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-[30%] shadow-lg rounded-md bg-white">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="">
          <span className="text-lg leading-6 font-medium text-gray-900">
            Chọn BeeShoes Voucher
          </span>
          <div className="bg-[#f8f8f8] px-3 py-2 flex items-center justify-between">
            <p className="text-[#0000008a] text-xs font-light">Mã voucher</p>
            <input
              type="text"
              className="flex-1 mx-2 border-[#00000024] border-[1px] rounded-[2px] text-sm"
            />
            <button className="bg-white text-[#0000008a] px-3 py-[5px]">
              Áp dụng
            </button>
          </div>
          <div className="mt-2 px-7 py-3">
            {/* Content based on the provided image */}
            <p className="text-sm text-gray-500">
              Vui lòng mua hàng trên ứng dụng Shopee để sử dụng ưu đãi.
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowVoucher;
