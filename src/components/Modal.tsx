import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalComponentType {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  check: boolean;
}

const ModalComponent = ({
  isVisible,
  onClose,
  children,
  check,
}: ModalComponentType) => {
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[100]"
      onClick={handleClose}
    >
      <div
        className={`${
          check ? "w-fit" : "w-[600px]"
        } relative top-20 mx-auto p-5 border w-[50%] shadow-lg rounded-md bg-white`}
      >
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

        <div className="bg-white p-2 rounded-xl overflow-y-hidden">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalComponent;
