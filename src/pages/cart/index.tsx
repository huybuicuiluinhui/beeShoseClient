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
        // Lấy thông tin từ API
        const newInfoShoe = res.data;

        // Cập nhật mảng infoShoeList
        setInfoShoeList((prevInfoShoeList: any) => {
          const updatedInfoShoeList = [...prevInfoShoeList];
          const existingInfoShoe = updatedInfoShoeList.find(
            (item) => item.id === id
          );

          if (existingInfoShoe) {
            // Nếu sản phẩm đã tồn tại trong mảng, cập nhật thông tin
            existingInfoShoe.infoShoe = newInfoShoe;
          } else {
            // Nếu sản phẩm chưa tồn tại trong mảng, thêm mới
            updatedInfoShoeList.push({ id, infoShoe: newInfoShoe, quantity });
          }

          return updatedInfoShoeList;
        });

        // Cập nhật thông tin sản phẩm
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
    <div className="flex items-center hover:bg-gray-100  py-5 border-b-[1px] border-dashed w-full border-[#ffba00]">
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
  const [voucher, setVoucher] = useState<IVoucher[]>();
  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState<boolean>(true);
  const [openList, setOpenList] = useState<boolean>(false);
  const [percent, setPrecent] = useState<number>();
  const [infoShoeList, setInfoShoeList] = useState<IIForDetailShoe[]>([]);
  const [total, setTotal] = useState<number>();
  const [totalPercent, setTotalPercent] = useState<number>();
  const getDetailShoe = async () => {
    const res = await axios({
      method: "get",
      url: API.getAllShoeDetail(),
    });
    if (res.status) {
      setListDetailShoe(res?.data?.data);
    }
  };
  const getVoucher = async () => {
    const res = await axios({
      method: "get",
      url: API.getVoucher(),
    });
    if (res.status) {
      setVoucher(res?.data.data);
    }
  };

  useEffect(() => {
    getVoucher();
    getDetailShoe();
  }, []);
  console.log("ldsfd", cartItems);
  useEffect(() => {
    if (!!listDetailShoe) {
      cartItems.reduce((total, cartItem) => {
        const item = listDetailShoe.find((i) => i.id === cartItem.id);
        setTotal(total + (item?.price || 0) * cartItem.quantity);
        return total + (item?.price || 0) * cartItem.quantity;
      }, 0);
    }
  }, [listDetailShoe]);
  useEffect(() => {
    if (!!listDetailShoe) {
      cartItems.reduce((total, cartItem) => {
        const item = listDetailShoe.find((i) => i.id === cartItem.id);
        if (percent) {
          setTotalPercent(
            total + (item?.price || 0) * cartItem.quantity * (percent / 100)
          );
          return (
            total + (item?.price || 0) * cartItem.quantity * (percent / 100)
          );
        } else {
          return 0;
        }
      }, 0);
    }
  }, [inputValue]);

  return (
    <div className="container mx-auto ">
      <ShippingProcess type={1} />
      <div className="flex shadow-md my-5">
        <div className="w-3/4 bg-white px-10 py-10">
          {/* <div className="flex justify-between border-b pb-8"> */}
          <h1 className="font-semibold text-2xl uppercase text-[#FFBA00]">
            Giỏ hàng của bạn
          </h1>
          {/* </div> */}
          <span className="font-medium text-sm  text-[#FFBA00]">
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
              Tổng tiền
            </h3>
          </div>
          {cartItems.map((item) => {
            return (
              <Item
                key={item.id}
                {...item}
                // infoShoeList={infoShoeList}
                setInfoShoeList={setInfoShoeList}
              />
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
        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-normal text-2xl border-b pb-4 uppercase  ">
            Thêm voucher
          </h1>

          <div className=" w-full font-medium ">
            <div
              className={`bg-white w-full  flex items-center justify-between rounded `}
            >
              Dùng mã voucher ngay
            </div>
            <div
              className={`w-full  mt-2 overflow-y-auto ${
                open ? "max-h-60" : "max-h-0"
              } `}
            >
              <div className="w-full bg-white">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                  onClick={() => setOpenList(true)}
                  placeholder=""
                  className="placeholder:text-gray-700 p-2 w-full "
                />
              </div>

              {!!openList &&
                voucher?.map((voucher, index) => (
                  <div
                    key={index}
                    className={`w-full flex justify-between  hover:bg-[#f5f5f5] cursor-pointer mt-2 py-2  ${
                      voucher?.name?.toLowerCase() ===
                        selected?.toLowerCase() && "bg-[#f5f5f5] text-black"
                    }
        ${
          voucher?.name?.toLowerCase().startsWith(inputValue)
            ? "block"
            : "hidden"
        }`}
                    onClick={() => {
                      if (
                        voucher?.name?.toLowerCase() !== selected.toLowerCase()
                      ) {
                        setSelected(voucher?.name);
                        setPrecent(voucher?.percentReduce);
                        setInputValue(voucher?.name);
                      }
                    }}
                  >
                    <div className={`w-[50%] `}>
                      <div
                        key={voucher?.name}
                        className={`w-full  text-xs  text-[#BFAEE3] `}
                      >
                        {voucher?.name}
                      </div>

                      <p className="text-[10px] mt-2">
                        Phần trăm giảm: {voucher.percentReduce}%
                      </p>
                      <p className="text-[10px] mt-2">
                        Số lượng còn: {voucher.quantity}
                      </p>
                    </div>
                    <div className={`w-[50%] flex flex-col justify-between `}>
                      <div
                        key={voucher?.name}
                        className={`w-full  text-[8px]   `}
                      >
                        Mã voucher: {voucher?.code}
                      </div>

                      <p className="text-[10px]">
                        Đơn tối thiểu:{" "}
                        <span className="text-red-400">
                          {convertToCurrencyString(voucher.minBillValue)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
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
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Giảm giá</span>
            {!!listDetailShoe && (
              <span className="font-semibold text-sm uppercase text-red-600">
                {" "}
                {formatCurrency(
                  cartItems.reduce((total, cartItem) => {
                    const item = listDetailShoe.find(
                      (i) => i.id === cartItem.id
                    );
                    if (percent) {
                      return (
                        total +
                        (item?.price || 0) * cartItem.quantity * (percent / 100)
                      );
                    } else {
                      return 0;
                    }
                  }, 0)
                )}
              </span>
            )}
          </div>
          <div className="border-t ">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Tổng tiền</span>
              {!!listDetailShoe && !!total && !!totalPercent ? (
                <span className="text-red-800">
                  {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                      const item = listDetailShoe.find(
                        (i) => i.id === cartItem.id
                      );
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0) - totalPercent
                  )}
                </span>
              ) : !!listDetailShoe && !!total ? (
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
                  alert("Không có sản phẩm trong giỏ hàng ");
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
                      totalPercent,
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
