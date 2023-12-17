import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../../static";
import { useShoppingCart } from "../../../context/shoppingCart.context";
import axios from "axios";
import API from "../../../api";
import { IDetailOrder, IOrder } from "../../../types/product.type";
import { convertToCurrencyString } from "../../../utils/format";
type ItemProps = {
  name: string;
  price: number;
  color: string;
  quantity: number;
};
const Item = ({ item }: { item: IDetailOrder }) => {
  return (
    <div className="flex justify-between items-center p-2 border-b ">
      <div className="flex gap-5 ">
        <div className="w-24 h-20 flex items-center justify-center">
          <img
            src={item.images.split(",")[0]}
            className="max-w-24 max-h-20  object-contain"
          />
        </div>
        <div>
          <div className="text-sm font-semibold">{item.name}</div>
          <div className="text-xs text-[#0000008a]">
            Phân loại hàng: {item?.color} - {item?.size} - {item?.sole}
          </div>
          <div className="text-[10px] text-gray-600 font-semibold ">
            X{item?.quantity}
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm">
          {!!item?.discountValue ? (
            <>
              <span className="line-through mr-2">
                {convertToCurrencyString(Number(item?.price))}
              </span>
              <span className="text-red-600 font-semibold">
                {convertToCurrencyString(Number(item?.discountValue))}
              </span>
            </>
          ) : (
            <span className="text-red-600 font-semibold">
              {convertToCurrencyString(Number(item?.price))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
const ItemOrder = ({ item }: { item: IOrder }) => {
  const navigate = useNavigate();
  const [dataDetailOrder, setDataDetailOrder] = useState<IDetailOrder[]>([]);
  const getDetailBill = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getDetailBill(Number(item?.id)),
      });
      if (res.status) {
        setDataDetailOrder(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching order details: ", error);
    }
  };
  useEffect(() => {
    if (item?.id) {
      getDetailBill();
    }
  }, [item?.id]);
  return (
    <div className="bg-white mb-3 shadow-lg flex flex-col">
      <div className="w-full px-2 py-2 border-b-[1px] flex items-center justify-between">
        <p className=" text-gray-500 text-sm">Mã Hóa Đơn: {item?.code}</p>
        <div className="flex items-center gap-4">
          <button
            className="text-gray-500 text-sm font-semibold"
            onClick={() => {
              navigate(
                `/timeLineOrder/${item?.status}/${item?.id}/${item?.code}`
              );
            }}
          >
            Xem tình trạng đơn hàng
          </button>
          <p className=" text-red-400 text-sm uppercase">
            |{" "}
            {item?.status === 2
              ? "Chờ xác nhận"
              : item?.status === 4
              ? "Chờ giao"
              : item?.status === 5
              ? "Đang giao"
              : item?.status === 6
              ? "Hoàn thành"
              : item?.status === 7
              ? "Đã hủy"
              : ""}
          </p>
        </div>
      </div>
      {!!dataDetailOrder && dataDetailOrder.length > 0 ? (
        dataDetailOrder.map((item, index) => {
          return <Item key={index} item={item} />;
        })
      ) : (
        <svg
          className="animate-spin w-12 h-12 text-indigo-400"
          viewBox="0 0 24 24"
        >
          {" "}
        </svg>
      )}
      <div className="p-4 self-end">
        <div className="font-semibold text-xs">
          Thành tiền:{" "}
          <span className="text-red-600">
            {convertToCurrencyString(item?.totalMoney + item?.moneyShip)}
            VND
          </span>
        </div>
      </div>
    </div>
  );
};
const InvoiceAll = ({ status }: { status: number | null }) => {
  const { userPrf } = useShoppingCart();
  const [dataOrder, setDataOrder] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getAllOrders = async () => {
    if (status === null) {
      try {
        setLoading(true);
        const res = await axios({
          method: "get",
          url: API.getAllOrders(Number(userPrf?.id)),
        });
        if (res.status) {
          setDataOrder(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching order details: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await axios({
          method: "get",
          url: API.getOrderWithStatus(Number(userPrf?.id), status),
        });
        if (res.status) {
          setDataOrder(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching order details: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (userPrf) {
      getAllOrders();
    }
  }, [userPrf]);

  return (
    <div className="w-full h-full">
      <div className="  rounded-lg overflow-hidden flex flex-col w-[80%] mx-auto  px-[1px]  mb-10">
        {!!dataOrder && dataOrder?.length > 0 && loading === false ? (
          dataOrder.map((e, i) => {
            return <ItemOrder item={e} key={i} />;
          })
        ) : dataOrder.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            {" "}
            <img
              src={Images.iconNoOrder}
              alt=""
              className="w-56 h-56 object-contain"
            />
            <span className="text-center font-medium text-3xl">
              Chưa có đơn hàng
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2 animate-bounce mt-3">
            <div className="w-8 h-8 bg-blue-400 rounded-full" />
            <div className="w-8 h-8 bg-green-400 rounded-full" />
            <div className="w-8 h-8 bg-black rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceAll;
