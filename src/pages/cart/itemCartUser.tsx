import React, { useState } from "react";
import ModalComponent from "../../components/Modal";
import { IDetailProductCart } from "../../types/product.type";
import { convertToCurrencyString } from "../../utils/format";
import axios from "axios";
import API from "../../api";
import { toast } from "react-toastify";
// import { useShoppingCart } from "../../context/shoppingCart.context";
import { getTokenCustomer } from "../../helper/useCookie";
import { useNavigate } from "react-router-dom";
const ItemCartUser = ({
  item,
  idUser,
  loading,
  setLoading,
}: {
  item: IDetailProductCart;
  idUser: string;
  loading: any;
  setLoading: any;
}) => {
  const token = getTokenCustomer();
  const navigate = useNavigate();
  const [showModal, setShowMoal] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(item?.quantity);
  const reduceShoe = async (idShoeDetail: number) => {
    try {
      const res = await axios({
        method: "put",
        url: API.updateAmountShoe(),
        data: {
          id: Number(idUser),
          quantity: quantity - 1,
          shoeDetail: idShoeDetail,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status) {
        setQuantity((prevQuantity) => prevQuantity - 1);
        toast("giảm");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(!loading);
    }
  };
  const addShoe = async (idShoeDetail: number) => {
    try {
      const res = await axios({
        method: "put",
        url: API.updateAmountShoe(),
        data: {
          id: Number(idUser),
          quantity: quantity + 1,
          shoeDetail: idShoeDetail,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status) {
        toast("tăng");
        setQuantity((prevQuantity) => prevQuantity + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(!loading);
    }
  };
  const removeFromCart = async (idShoeDetail: number) => {
    try {
      const res = await axios({
        method: "delete",
        url: API.removeFromCart(idShoeDetail),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status) {
        toast("xóa " + idShoeDetail);
      }
    } catch (error) {
    } finally {
      setLoading(!loading);
    }
  };
  return (
    <div className="flex items-center hover:bg-gray-100  py-5 border-b-[1px] border-dashed w-full border-gray-500">
      <div
        className="flex w-[5%] items-center justify-center cursor-pointer"
        onClick={() => {
          setShowMoal(true);
        }}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nGNgoBAwMjAw8BGhjg+qFkVgCQMDgygeTaJQNXzYJFYyMDBI4NC0EoccTgWihDRhUyhKrCZ0/ywh4G/qaBQlx6mi5ASOKDnRQXYCIDvJkQwARZsQRRiqQN4AAAAASUVORK5CYII=" />{" "}
      </div>
      <div className="flex w-2/5">
        {/* product */}
        <div className="w-20">
          <img className="h-auto w-[80%] object-contain" src={item?.image} />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-semibold text-sm ">{item.name}</span>
          <span className="text-red-500 text-xs">{item.sole}</span>
        </div>
      </div>
      <div className=" flex items-center justify-center w-1/5">
        <svg
          className="fill-current text-gray-600 w-3"
          viewBox="0 0 448 512"
          onClick={() => {
            reduceShoe(item?.id);
          }}
        >
          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
        <span className=" px-2">{quantity}</span>
        <svg
          className="fill-current text-gray-600 w-3"
          viewBox="0 0 448 512"
          onClick={() => {
            addShoe(item?.id);
          }}
        >
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
      </div>
      <div className="w-1/5">
        {!!item.discountPercent && item.discountValue ? (
          <>
            <p className="text-center  font-semibold text-sm text-red-500">
              {convertToCurrencyString(item?.discountValue)}
            </p>
            <p className="text-center  font-semibold text-xs  line-through">
              {convertToCurrencyString(item.price)}
            </p>
          </>
        ) : (
          <p className="text-center  font-semibold text-xs  line-through">
            {convertToCurrencyString(item.price)}
          </p>
        )}
      </div>
      {!!item?.discountPercent && !!item.discountValue ? (
        <span className="text-center w-1/5 font-semibold text-sm ">
          {convertToCurrencyString(item.discountValue * quantity)}
        </span>
      ) : (
        <span className="text-center w-1/5 font-semibold text-sm ">
          {convertToCurrencyString(item.price * quantity)}
        </span>
      )}
      {showModal && (
        <ModalComponent
          check={true}
          isVisible={showModal}
          onClose={() => {
            setShowMoal(false);
          }}
        >
          <div className="w-full flex flex-col justify-center ">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
              Xác nhận xóa sản phẩm khỏi giỏ hàng ?
            </h3>

            <div className="w-full flex justify-around items-center mb-2">
              <button
                onClick={() => {
                  setShowMoal(false);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-green-400  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 "
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  removeFromCart(item?.id);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default ItemCartUser;
