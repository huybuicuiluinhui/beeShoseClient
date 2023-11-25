import React, { useEffect, useState } from "react";
import Images from "../../static";
import { useNavigate } from "react-router-dom";
import path from "../../constants/path";
import ShippingProcess from "../../components/shippingProcess";
import { useShoppingCart } from "../../context/shoppingCart.context";
import axios from "axios";
import {
  IIForDetailShoe,
  IListDeatilShoe,
  IVoucher,
} from "../../types/product.type";
import { convertToCurrencyString } from "../../utils/format";
import API from "../../api";
import { formatCurrency } from "../../utils/formatCurrency";
import { toast } from "react-toastify";
type CartItemProps = {
  id: number;
  quantity: number;
  setInfoShoeList: any;
};

const Item = ({ id, quantity, setInfoShoeList }: CartItemProps) => {
  const [infoShoe, setInfoShoe] = useState<IIForDetailShoe>();
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const getDetailShoeWithId = async () => {
    try {
      const res = await axios.get(API.getShoeDetailWithId(id));
      if (res.status === 200) {
        const newInfoShoe = res.data;

        setInfoShoeList((prevInfoShoeList: any) => {
          const updatedInfoShoeList = [...prevInfoShoeList];
          const existingInfoShoe = updatedInfoShoeList.find(
            (item) => item.id === id
          );

          if (existingInfoShoe) {
            existingInfoShoe.infoShoe = newInfoShoe;
          } else {
            updatedInfoShoeList.push({ id, infoShoe: newInfoShoe, quantity });
          }

          return updatedInfoShoeList;
        });
        setInfoShoe(newInfoShoe);
      }
    } catch (error) {
      console.error("Error fetching shoe details: ", error);
    }
  };

  useEffect(() => {
    getDetailShoeWithId();
  }, [id]);

  return infoShoe ? (
    <div className="flex items-center hover:bg-gray-100  py-5 border-b-[1px] border-dashed w-full border-gray-500">
      <div
        className="flex w-[5%] items-center justify-center cursor-pointer"
        onClick={() => {
          removeFromCart(infoShoe.id);
        }}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nGNgoBAwMjAw8BGhjg+qFkVgCQMDgygeTaJQNXzYJFYyMDBI4NC0EoccTgWihDRhUyhKrCZ0/ywh4G/qaBQlx6mi5ASOKDnRQXYCIDvJkQwARZsQRRiqQN4AAAAASUVORK5CYII=" />{" "}
      </div>
      <div className="flex w-2/5">
        {/* product */}
        <div className="w-20">
          <img
            className="h-auto w-[80%] object-contain"
            src={infoShoe?.images[0]?.name}
          />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-semibold text-sm ">
            {" "}
            {infoShoe?.shoe.name}-{infoShoe?.color?.name}-{infoShoe?.size?.name}
          </span>
          <span className="text-red-500 text-xs">
            {" "}
            {infoShoe?.shoe.brand.name}
          </span>
          <a
            href="#"
            className="font-semibold hover:text-red-500 text-gray-500 text-xs"
          >
            Xóa
          </a>
        </div>
      </div>
      <div className=" flex items-center justify-center w-1/5">
        <svg
          className="fill-current text-gray-600 w-3"
          viewBox="0 0 448 512"
          onClick={() => {
            decreaseCartQuantity(infoShoe?.id);
          }}
        >
          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
        <span className=" px-2   ">{quantity}</span>
        <svg
          className="fill-current text-gray-600 w-3"
          viewBox="0 0 448 512"
          onClick={() => {
            if (quantity >= infoShoe.quantity) {
              alert("Sản phẩm đạt số lượng tối đa");
              return;
            } else {
              increaseCartQuantity(infoShoe.id);
            }
          }}
        >
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        {convertToCurrencyString(infoShoe.price)}
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        {convertToCurrencyString(infoShoe.price * quantity)}
      </span>
    </div>
  ) : (
    <div></div>
  );
};
const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useShoppingCart();
  const [listDetailShoe, setListDetailShoe] = useState<IListDeatilShoe[]>();
  const [infoShoeList, setInfoShoeList] = useState<IIForDetailShoe[]>([]);
  const [total, setTotal] = useState<number>();
  // const [totalPercent, setTotalPercent] = useState<number>();
  // function generateRandomName() {
  //   const characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   let randomName = "";
  //   for (let i = 0; i < 50; i++) {
  //     randomName += characters.charAt(
  //       Math.floor(Math.random() * characters.length)
  //     );
  //   }
  //   return randomName;
  // }
  // function setUserNameCookie() {
  //   let userName = getCookie("user_token");
  //   if (!userName) {
  //     userName = generateRandomName();
  //     setCookie("user_token", userName, 365);
  //   }
  //   localStorage.setItem("user_token", userName);
  // }

  // function getCookie(cookieName: string) {
  //   const name = cookieName + "=";
  //   const decodedCookie = decodeURIComponent(document.cookie);
  //   const cookieArray = decodedCookie.split(";");
  //   for (let i = 0; i < cookieArray.length; i++) {
  //     let cookie = cookieArray[i];
  //     while (cookie.charAt(0) === " ") {
  //       cookie = cookie.substring(1);
  //     }
  //     if (cookie.indexOf(name) === 0) {
  //       return cookie.substring(name.length, cookie.length);
  //     }
  //   }
  //   return "";
  // }

  // function setCookie(
  //   cookieName: string,
  //   cookieValue: string,
  //   expirationDays: number
  // ) {
  //   const d = new Date();
  //   d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  //   const expires = "expires=" + d.toUTCString();
  //   document.cookie =
  //     cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  // }

  const getDetailShoe = async () => {
    const res = await axios({
      method: "get",
      url: API.getAllShoeDetail(),
    });
    if (res.status) {
      setListDetailShoe(res?.data?.data);
    }
  };

  useEffect(() => {
    // setUserNameCookie();
    getDetailShoe();
  }, []);
  useEffect(() => {
    if (!!listDetailShoe) {
      cartItems.reduce((total, cartItem) => {
        const item = listDetailShoe.find((i) => i.id === cartItem.id);
        setTotal(total + (item?.price || 0) * cartItem.quantity);
        return total + (item?.price || 0) * cartItem.quantity;
      }, 0);
    }
  }, [listDetailShoe, cartItems]);

  return (
    <div className="container mx-auto ">
      <ShippingProcess type={1} />
      <div className="flex shadow-md my-5">
        <div className="w-3/4 bg-white px-10 py-10">
          <h1 className="font-semibold text-2xl uppercase text-gray-500">
            Giỏ hàng của bạn
          </h1>
          {/* </div> */}
          <span className="font-medium text-sm  text-gray-500">
            ({cartItems.length} sản phẩm)
          </span>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs  w-[5%]"></h3>
            <h3 className="font-semibold text-gray-600 text-xs  w-2/5">
              Thông tin chi tiết sản phẩm
            </h3>
            <h3 className="font-semibold  text-gray-600 text-xs  w-1/5 text-center">
              Số lượng
            </h3>
            <h3 className="font-semibold  text-gray-600 text-xs  w-1/5 text-center">
              Giá
            </h3>
            <h3 className="font-semibold  text-gray-600 text-xs  w-1/5 text-center">
              Thành tiền
            </h3>
          </div>
          {cartItems.map((item) => {
            return (
              <Item key={item.id} {...item} setInfoShoeList={setInfoShoeList} />
            );
          })}

          <a
            href={path.home}
            className="flex font-semibold text-[#BFAEE3] text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-[#BFAEE3] w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Tiếp tục mua sắm
          </a>
        </div>
        <div id="summary" className="w-1/4 px-4 py-10">
          <img
            src={Images.bannerCart}
            alt=""
            className="w-full h-auto object-contain"
          />

          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Tạm tính</span>
            {!!listDetailShoe && (
              <span className="font-semibold text-sm uppercase text-red-400">
                {" "}
                {formatCurrency(
                  cartItems.reduce((total, cartItem) => {
                    const item = listDetailShoe.find(
                      (i) => i.id === cartItem.id
                    );
                    return total + (item?.price || 0) * cartItem.quantity;
                  }, 0)
                )}
              </span>
            )}
          </div>
          <div className="border-t ">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Tổng tiền</span>
              {!!listDetailShoe && !!total ? (
                <span className="text-red-800">
                  {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                      const item = listDetailShoe.find(
                        (i) => i.id === cartItem.id
                      );
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0)
                  )}
                </span>
              ) : (
                0
              )}
            </div>
            {total === 0 || cartItems.length === 0 ? (
              <button
                className="bg-[#fe672b7d] font-semibold   py-3 text-sm text-white uppercase w-full"
                onClick={() => {
                  toast("Không có sản phẩm trong giỏ hàng ");
                }}
              >
                Mua hàng
              </button>
            ) : (
              <button
                className="bg-[#fe662b] font-semibold hover:bg-red-600  py-3 text-sm text-white uppercase w-full"
                onClick={() =>
                  navigate(path.payment, {
                    state: {
                      infoShoeList,
                      total,
                    },
                  })
                }
              >
                Mua hàng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
