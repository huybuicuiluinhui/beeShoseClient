import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../api";
import axios from "axios";
import { toast } from "react-toastify";
import path from "../../constants/path";
import { useShoppingCart } from "../../context/shoppingCart.context";

export default function Payment() {
  const navigate = useNavigate();
  const { removeAllCart } = useShoppingCart();
  useEffect(() => {
    let isMounted = true;

    async function check() {
      const paymentReturn = JSON.parse(
        localStorage.getItem("checkout") || "{}"
      ) as Record<string, any>;

      const requestData: Record<string, string> = {};
      for (const [key, value] of new URLSearchParams(window.location.search)) {
        requestData[key] = value;
      }
      requestData.vnp_TxnRef = paymentReturn.id ? paymentReturn.id : null;

      try {
        const response = await axios.get(
          baseUrl + `api/vn-pay/payment-return`,
          { params: requestData }
        );

        if (isMounted) {
          if (response.data) {
            const response = await axios.post(
              baseUrl +
                "api/bill/create-bill-client-vn-pay/" +
                requestData.vnp_BankTranNo,
              paymentReturn
            );
            if (response.status) {
              toast.success("Đặt hàng thành công");
              removeAllCart();
              navigate(path.home);
            }
          } else {
            localStorage.removeItem("checkout");
            toast.error("Thanh toán thất bại, vui lòng thử lại!");
            navigate(path.cart);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    check();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return <></>;
}
