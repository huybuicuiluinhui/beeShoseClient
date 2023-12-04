import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../context/shoppingCart.context";
import Images from "../static";
import { formatCurrency } from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import path from "../constants/path";
import axios from "axios";
import API from "../api";
import {
  IDetailProductCart,
  IIForDetailShoe,
  IListDeatilShoe,
} from "../types/product.type";
import { calculateTotalDone, convertToCurrencyString } from "../utils/format";
type ShoppingCartProps = {
  isOpen: boolean;
};
type CartItemProps = {
  id: number;
  quantity: number;
};
const ItemInCart = ({ id, quantity }: CartItemProps) => {
  const [infoShoe, setInfoShoe] = useState<IIForDetailShoe>();
  const [showToast, setShowToast] = useState<boolean>();
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const getDetailShoeWithId = async () => {
    const res = await axios({
      method: "get",
      url: API.getShoeDetailWithId(id),
    });
    if (res.status) {
      setInfoShoe(res?.data);
    }
  };
  useEffect(() => {
    getDetailShoeWithId();
  }, [id]);
  return infoShoe ? (
    <div className="flex justify-between items-center p-3 border-b-[2px] border-dotted w-full border-gray-400  ">
      <img
        src={infoShoe?.images[0]?.name}
        className="w-[90px] h-[90px] object-contain"
      />
      <div className="w-[70%] flex flex-col gap-2">
        <p className="text-xs font-medium line-clamp-2 ">
          {infoShoe?.shoe.name}-{infoShoe?.color.name}-{infoShoe?.size.name}
        </p>
        <p className=" text-sm">{convertToCurrencyString(infoShoe?.price)}</p>
        <div className="flex justify-between">
          <div className="flex ">
            <div
              className=" border-[1px] border-gray-300 w-6 flex items-center justify-center"
              onClick={() => [decreaseCartQuantity(infoShoe.id)]}
            >
              -
            </div>
            <div className="border-[1px] border-gray-300 w-6 flex items-center justify-center text-xs">
              {quantity}
            </div>
            <div
              className="border-[1px] border-gray-300 w-6 flex items-center justify-center"
              onClick={() => {
                if (quantity >= infoShoe.quantity) {
                  setShowToast(true);
                  return;
                } else {
                  increaseCartQuantity(infoShoe.id);
                }
              }}
            >
              +
            </div>
          </div>
          <div
            className="border-[1px] bg-[#f2f2f2] flex items-center h-full px-2  "
            onClick={() => {
              removeFromCart(infoShoe?.id);
            }}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhklEQVR4nO3SMQrCUBAE0HeFtJa5QirBc1jnEsE2VQ5jbSOexDQWHkRZ2OIjXyOS0oFh2Zk/DCyfldCgTXY44ZKzK7ymFh7x+ILju+Y7hqKl5JB+tTlwQ48tptSm3Pv0LYXLhzWtin/4x4NtsEstZuyL4RlHHCoM/fopvMc5//QrQw9/HTwB68BA1F7PyxoAAAAASUVORK5CYII=" />
            <span
              className="font-medium"
              onClick={() => removeFromCart(infoShoe?.id)}
            >
              Xóa
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
const ItemInCart2 = ({
  item,
  loading,
  setLoading,
}: {
  item: IDetailProductCart;
  loading: any;
  setLoading: any;
}) => {
  const {
    userPrf,
    reduceShoe,
    addShoe,
    removeFromCartUser,
    getProductQuantityById,
  } = useShoppingCart();
  const [quantity, setQuantity] = useState<number>(item?.quantity);

  // const reduceShoe = async (idShoeDetail: number) => {
  //   try {
  //     const res = await axios({
  //       method: "put",
  //       url: API.updateAmountShoe(),
  //       data: {
  //         id: Number(userPrf?.id),
  //         quantity: quantity - 1,
  //         shoeDetail: idShoeDetail,
  //       },
  //     });
  //     if (res.status) {
  //       setQuantity((prevQuantity) => prevQuantity - 1);
  //       toast("giảm");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(!loading);
  //   }
  // };
  // const addShoe = async (idShoeDetail: number) => {
  //   try {
  //     const res = await axios({
  //       method: "put",
  //       url: API.updateAmountShoe(),
  //       data: {
  //         id: Number(userPrf?.id),
  //         quantity: quantity + 1,
  //         shoeDetail: idShoeDetail,
  //       },
  //     });
  //     if (res.status) {
  //       toast("tăng");
  //       setQuantity((prevQuantity) => prevQuantity + 1);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(!loading);
  //   }
  // };
  // const removeFromCart = async (idShoeDetail: number) => {
  //   try {
  //     const res = await axios({
  //       method: "delete",
  //       url: API.removeFromCart(idShoeDetail),
  //     });
  //     if (res.status) {
  //       toast("xóa " + idShoeDetail);
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(!loading);
  //   }
  // };
  return (
    <div className="flex justify-between items-center p-3 border-b-[2px] border-dotted w-full border-gray-400  ">
      <img src={item.image} className="w-[90px] h-[90px] object-contain" />
      <div className="w-[70%] flex flex-col gap-2">
        <p className="text-xs font-medium line-clamp-2 ">{item.name}</p>
        <p className=" text-sm">
          {convertToCurrencyString(item.discountValue)}
        </p>
        <div className="flex justify-between">
          <div className="flex ">
            <div
              className=" border-[1px] border-gray-300 w-6 flex items-center justify-center"
              onClick={() => {
                reduceShoe(
                  item.id,
                  getProductQuantityById(item.idProductDetail)
                );
              }}
            >
              -
            </div>
            <div className="border-[1px] border-gray-300 w-6 flex items-center justify-center text-xs">
              {getProductQuantityById(item.idProductDetail)}
            </div>
            <div
              className="border-[1px] border-gray-300 w-6 flex items-center justify-center"
              onClick={() => {
                addShoe(item.id, getProductQuantityById(item.idProductDetail));
              }}
            >
              +
            </div>
          </div>
          <div
            className="border-[1px] bg-[#f2f2f2] flex items-center h-full px-2  "
            onClick={() => removeFromCartUser(item?.id)}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhklEQVR4nO3SMQrCUBAE0HeFtJa5QirBc1jnEsE2VQ5jbSOexDQWHkRZ2OIjXyOS0oFh2Zk/DCyfldCgTXY44ZKzK7ymFh7x+ILju+Y7hqKl5JB+tTlwQ48tptSm3Pv0LYXLhzWtin/4x4NtsEstZuyL4RlHHCoM/fopvMc5//QrQw9/HTwB68BA1F7PyxoAAAAASUVORK5CYII=" />
            <span className="font-medium">Xóa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const navigate = useNavigate();
  const { closeCart, cartItems, cartQuantity, listProducts, cartQuantityUser } =
    useShoppingCart();
  const [listDetailShoe, setListDetailShoe] = useState<IListDeatilShoe[]>();
  // const [listProducts, setListProducts] = useState<IDetailProductCart[]>();
  const [itemCheckRender, setItemCheckRender] = useState<boolean>(false);
  const getDetailShoe = async () => {
    const res = await axios({
      method: "get",
      url: API.getAllShoeDetail(),
    });
    if (res.status) {
      setListDetailShoe(res?.data?.data);
    }
  };
  const { userPrf } = useShoppingCart();
  // const getListDetailCart = async () => {
  //   try {
  //     const res = await axios({
  //       method: "get",
  //       url: API.getListDetailCart(Number(userPrf?.id)),
  //     });
  //     if (res.status) {
  //       setListProducts(res?.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    getDetailShoe();
  }, [itemCheckRender]);
  // useEffect(() => {
  //   getListDetailCart();
  // }, [userPrf?.id]);
  return (
    <div>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-10    ">
          <div className="w-full h-full" onClick={() => closeCart()}></div>
          <div className="bg-white  shadow-lg h-screen w-[30%]  transform   transition-transform ease-in-out   ">
            <div className="flex justify-between items-center px-4 pt-4 mb-2  top-0 bg-white  w-full ">
              <h2 className="text-lg font-semibold  uppercase   ">
                {!!userPrf && !!listProducts
                  ? ` Giỏ hàng (${listProducts.length} sản phẩm)`
                  : ` Giỏ hàng (${cartItems.length} sản phẩm)`}
              </h2>
              <div onClick={() => closeCart()} className="cursor-pointer">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nGNgoBAwMjAw8BGhjg+qFkVgCQMDgygeTaJQNXzYJFYyMDBI4NC0EoccTgWihDRhUyhKrCZ0/ywh4G/qaBQlx6mi5ASOKDnRQXYCIDvJkQwARZsQRRiqQN4AAAAASUVORK5CYII=" />{" "}
              </div>
            </div>
            <div className="w-full bg-gray-500 h-[1.5px]  " />

            <div className="w-full overflow-y-auto max-h-[550px]  ">
              {!!userPrf && !!listProducts
                ? listProducts.map((item) => {
                    return (
                      <ItemInCart2
                        key={item.id}
                        loading={itemCheckRender}
                        setLoading={setItemCheckRender}
                        item={item}
                      />
                    );
                  })
                : cartItems.map((item) => {
                    return <ItemInCart key={item.id} {...item} />;
                  })}
            </div>
            <div className="mt-4 px-2">
              <p className="text-sm font-medium">
                Tổng số lượng:{" "}
                {!!listProducts ? cartQuantityUser : cartQuantity}
              </p>
              <p className="text-sm font-medium">
                Tổng giá:{" "}
                <span className="text-red-500">
                  {!!userPrf && !!listProducts
                    ? formatCurrency(calculateTotalDone(listProducts))
                    : cartItems &&
                      !!listDetailShoe &&
                      !!listDetailShoe.length &&
                      formatCurrency(
                        cartItems.reduce((total, cartItem) => {
                          const item = listDetailShoe.find(
                            (i) => i.id === cartItem.id
                          );
                          return total + (item?.price || 0) * cartItem.quantity;
                        }, 0)
                      )}
                </span>
              </p>
            </div>
            <div className=" flex justify-around items-center my-5 ">
              <button
                className="border-gray-300 border-[1px] px-3 py-2 rounded font-medium w-[45%] hover:border-gray-500"
                onClick={() => [closeCart(), navigate(path.cart)]}
              >
                Xem giỏ hàng
              </button>
              {!!listProducts ? (
                <button
                  className="rounded font-medium bg-[#5ae0d7] px-3 py-2 w-[45%] "
                  onClick={() => [navigate(path.payMentWithUser), closeCart()]}
                >
                  Thanh toán ({listProducts.length})
                </button>
              ) : (
                <button
                  className="rounded font-medium bg-[#5ae0d7] px-3 py-2 w-[45%] "
                  onClick={() => [navigate(path.payment), closeCart()]}
                >
                  Thanh toán ({cartItems.length})
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ShoppingCart;
