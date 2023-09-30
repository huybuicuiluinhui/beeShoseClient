import React from "react";
import { useShoppingCart } from "../context/shoppingCart.context";
import Images from "../static";
import { formatCurrency } from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import path from "../constants/path";
type ShoppingCartProps = {
  isOpen: boolean;
};
type CartItemProps = {
  id: number;
  quantity: number;
};
const ItemInCart = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  // const item = storeItems.find((i) => i.id === id);
  // if (item == null) return null;

  return (
    <div className="flex justify-between items-center p-3 border-b-[2px] border-dotted w-full border-[#ffba00]">
      <img src={Images.giay05} className="w-[90px] h-[90px] object-contain" />
      <div className="w-[60%] flex flex-col gap-2">
        <p className="text-xs font-medium line-clamp-2 ">
          Giày chạy xuyên việt
        </p>
        <p className=" text-sm">10000000</p>
        <div className="flex justify-between">
          <div className="flex ">
            <div className=" border-[1px] border-gray-300 w-6 flex items-center justify-center">
              -
            </div>
            <div className="border-[1px] border-gray-300 w-6 flex items-center justify-center text-xs">
              1
            </div>
            <div className="border-[1px] border-gray-300 w-6 flex items-center justify-center">
              +
            </div>
          </div>
          <div className="border-[1px] bg-[#f2f2f2] flex items-center h-full px-2  ">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhklEQVR4nO3SMQrCUBAE0HeFtJa5QirBc1jnEsE2VQ5jbSOexDQWHkRZ2OIjXyOS0oFh2Zk/DCyfldCgTXY44ZKzK7ymFh7x+ILju+Y7hqKl5JB+tTlwQ48tptSm3Pv0LYXLhzWtin/4x4NtsEstZuyL4RlHHCoM/fopvMc5//QrQw9/HTwB68BA1F7PyxoAAAAASUVORK5CYII=" />
            <span
              className="font-medium"
              // onClick={() => removeFromCart(item.id)}
            >
              Xóa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const navigate = useNavigate();
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <div>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-10 h-screen">
          <div className="w-full h-full" onClick={() => closeCart()}></div>
          <div className="bg-white  shadow-lg h-full w-[30%]">
            <div className="flex justify-between items-center px-4 pt-4 mb-2 ">
              <h2 className="text-lg font-semibold  uppercase  ">Giỏ hàng</h2>
              <div onClick={() => closeCart()} className="cursor-pointer">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nGNgoBAwMjAw8BGhjg+qFkVgCQMDgygeTaJQNXzYJFYyMDBI4NC0EoccTgWihDRhUyhKrCZ0/ywh4G/qaBQlx6mi5ASOKDnRQXYCIDvJkQwARZsQRRiqQN4AAAAASUVORK5CYII=" />{" "}
              </div>
            </div>
            <div className="w-full bg-[#ffba00] h-[1.5px]  " />

            {/* Danh sách sản phẩm trong giỏ hàng */}
            <div className="w-full  ">
              {cartItems.map((item) => (
                <ItemInCart key={item.id} {...item} />
              ))}
            </div>
            {/* Tổng số lượng sản phẩm và tổng giá */}
            <div className="mt-4 px-2">
              <p className="text-sm font-medium">Tổng số lượng: 3</p>
              <p className="text-sm font-medium">
                Tổng giá:
                {/* {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )} */}
              </p>
            </div>
            <div className=" flex justify-around items-center mt-5 ">
              <button className="border-[#ffba00] border-[1px] px-3 py-2 rounded font-medium w-[45%]">
                Tiếp tục mua sắm
              </button>
              <button
                className="rounded font-medium bg-[#5ae0d7] px-3 py-2 w-[45%]"
                onClick={() => [navigate(path.cart), closeCart()]}
              >
                Thanh toán
              </button>
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
