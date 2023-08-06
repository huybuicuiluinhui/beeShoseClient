import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastType {
  typeToast: string;
  message: string;
}

const SimpleToast = ({ typeToast, message }: ToastType) => {
  const prevTypeToast = useRef("");
  const prevMessage = useRef("");
  console.log("prevTypeToast", prevTypeToast);
  console.log("prevMessage", prevMessage);

  const notify = () => {
    typeToast === "success"
      ? toast.success(message)
      : typeToast === "error"
      ? toast.error(message)
      : typeToast === "warn"
      ? toast.warn(message)
      : typeToast === "info"
      ? toast.info(message)
      : toast(message);
  };
  useEffect(() => {
    // Kiểm tra xem props có thay đổi so với lần trước hay không
    const typeToastChanged = typeToast !== prevTypeToast.current;
    const messageChanged = message !== prevMessage.current;

    // Gọi hàm notify nếu có sự thay đổi trong props
    if (typeToastChanged || messageChanged) {
      notify();
      // Lưu giá trị props hiện tại vào refs để so sánh trong lần render tiếp theo
      prevTypeToast.current = typeToast;
      prevMessage.current = message;
    }
  }, [typeToast, message]);

  return (
    <>
      <ToastContainer
        position="top-right"
        closeOnClick={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        autoClose={2000}
        draggable={true}
        closeButton={<p>Đóng</p>}
        icon={"❤"}

        // autoClose={false}
      />
    </>
  );
};

export default SimpleToast;
