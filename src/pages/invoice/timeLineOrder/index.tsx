import React, { useEffect, useState } from "react";
import Images from "../../../static";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API from "../../../api";
interface IData {
  createAt: string;
  createBy: string;
  id: number;
  index: number;
  note: string;
  status: number;
}
const TimeLineOrder = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IData[]>();
  const getBillHistory = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getBillHistory(Number(param?.idBill)),
      });
      if (res.status) {
        setData(res?.data);
      }
    } catch (error) {
      console.error("Error fetching bill history: ", error);
    }
  };
  useEffect(() => {
    if (param) {
      getBillHistory();
    }
  }, [param]);
  return (
    <div className="w-[80%] mt-20 mx-auto min-h-screen ">
      <div className="  flex items-center  justify-between ">
        <div className="flex items-center gap-5">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <img
              src={Images.iconBack}
              alt=""
              className="w-10 h-10 object-contain "
            />
          </button>
          <span className="font-semibold ">Trạng thái đơn hàng của bạn</span>
        </div>
        <div>
          <span className="uppercase font-medium">
            Mã đơn hàng: {param?.code}
          </span>
        </div>
      </div>
      {!!data && (
        <ol className=" sm:flex justify-between  mt-20">
          <li className="relative mb-6 sm:mb-0 w-[25%]">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <img
                  src={Images.iconWaitComfirm}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
            </div>
            <div className="mt-3 sm:pe-8">
              <span className={`text-sm font-semibold text-red-700  `}>
                Chờ xác nhận
              </span>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {data[0].createAt}
              </time>
              <span className="text-sm font-medium">
                Ghi chú: {data[0].note}
              </span>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0 w-[25%]">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {Number(param?.status) === 2 ? (
                  <img
                    src={Images.iconWaitDeliveryGray}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <img
                    src={Images.iconWaitDelivery}
                    className="w-10 h-10 object-contain"
                  />
                )}
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
            </div>
            <div className="mt-3 sm:pe-8">
              <span
                className={`text-sm font-semibold  dark:text-white ${
                  Number(param?.status) === 2 ? "text-gray-500" : "text-red-600"
                }`}
              >
                Chờ giao
              </span>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {data[1].createAt}
              </time>
              <span className="text-sm font-medium">
                Ghi chú: {data[1].note}
              </span>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0 w-[25%]">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {Number(param?.status) <= 4 ? (
                  <img
                    src={Images.iconDeliveryFash}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <img
                    src={Images.iconDeliveryFashRed}
                    className="w-10 h-10 object-contain"
                  />
                )}
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
            </div>
            <div className="mt-3 sm:pe-8">
              <span
                className={`text-sm font-semibold  dark:text-white ${
                  Number(param?.status) <= 4 ? "text-gray-500" : "text-red-600"
                }`}
              >
                Đang giao
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white"></span>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {data[2]?.createAt}
              </time>
              {data[2]?.note && (
                <span className="text-sm font-medium">
                  Ghi chú: {data[2]?.note}
                </span>
              )}
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0 w-[25%]">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {Number(param?.status) <= 5 ? (
                  <img
                    src={Images.iconUnboxGray}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <img
                    src={Images.iconUnbox}
                    className="w-10 h-10 object-contain"
                  />
                )}
              </div>
            </div>
            <div className="mt-3 sm:pe-8">
              <span
                className={`text-sm font-semibold  dark:text-white ${
                  Number(param?.status) <= 5 ? "text-gray-500" : "text-red-600"
                }`}
              >
                Hoàn thành
              </span>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {data[3]?.createAt}
              </time>
              {data[3]?.note && (
                <span className="text-sm font-medium">
                  Ghi chú: {data[3]?.note}
                </span>
              )}
            </div>
          </li>
        </ol>
      )}
    </div>
  );
};

export default TimeLineOrder;
