import React, { useEffect } from "react";
import Images from "../../../static";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API from "../../../api";
const TimeLineOrder = () => {
  const param = useParams();
  const navigate = useNavigate();
  console.log("param", param);
  const getBillHistory = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getBillHistory(Number(param?.idBill)),
      });
      if (res.status) {
        console.log(res.data);
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
      <ol className="items-center sm:flex justify-center  mt-20">
        <li className="relative mb-6 sm:mb-0">
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
              Released on December 2, 2021
            </time>
          </div>
        </li>
        <li className="relative mb-6 sm:mb-0">
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
                Number(param?.status) === 2 ? "text-gray-900" : "text-red-600"
              }`}
            >
              Chờ giao
            </span>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on December 23, 2021
            </time>
          </div>
        </li>
        <li className="relative mb-6 sm:mb-0">
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
                Number(param?.status) <= 4 ? "text-gray-900" : "text-red-600"
              }`}
            >
              Đang giao
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white"></span>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on January 5, 2022
            </time>
          </div>
        </li>
        <li className="relative mb-6 sm:mb-0">
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
            {/* <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" /> */}
          </div>
          <div className="mt-3 sm:pe-8">
            <span
              className={`text-sm font-semibold  dark:text-white ${
                Number(param?.status) <= 5 ? "text-gray-900" : "text-red-600"
              }`}
            >
              Hoàn thành
            </span>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on January 5, 2022
            </time>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default TimeLineOrder;
