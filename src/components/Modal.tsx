import React from "react";
interface ModalComponentType {
  isVisible: boolean;
  onClose: () => void;
  children: any;
  check: boolean;
}
const ModalComponent = ({
  isVisible,
  onClose,
  children,
  check,
}: ModalComponentType) => {
  if (!isVisible) return null;
  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
    >
      <div
        className={`${check ? "w-[25%]" : "w-[600px]"} flex flex-col relative`}
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
        {/* <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button> */}
        <div className="bg-white p-2 rounded-xl">{children}</div>
      </div>
    </div>
  );
};

export default ModalComponent;
