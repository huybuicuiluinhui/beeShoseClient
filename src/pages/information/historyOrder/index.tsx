import React, { useState } from "react";
import path from "../../../constants/path";
import { useNavigate } from "react-router-dom";
import { IOrderType } from "../../../types/product.type";

const HistoryOrder = () => {
  const navigate = useNavigate();
  const dataOrder: IOrderType[] = [
    {
      customers: "customers 1",
      amount: 1,
      status: 1,
      totalMoney: 80,
      date: "10/09/2021",
      id: "1",
    },
    {
      customers: "customers 3",
      amount: 18,
      status: 2,
      totalMoney: 28,
      date: "10/09/2021",
      id: "3",
    },
    {
      customers: "customers 4",
      amount: 20,
      status: 3,
      totalMoney: 44,
      date: "10/09/2021",
      id: "4",
    },
    {
      customers: "customers 5",
      amount: 66,
      status: 4,
      totalMoney: 11,
      date: "10/09/2021",
      id: "5",
    },
    {
      customers: "customers 6",
      amount: 92,
      status: 5,
      totalMoney: 86,
      date: "10/09/2021",
      id: "6",
    },
    {
      customers: "customers 7",
      amount: 63,
      status: 6,
      totalMoney: 31,
      date: "10/09/2021",

      id: "7",
    },
    {
      customers: "customers 8",
      amount: 24,
      status: 1,
      totalMoney: 79,
      date: "10/09/2021",

      id: "8",
    },
    {
      customers: "customers 9",
      amount: 76,
      status: 1,
      totalMoney: 79,
      date: "10/09/2021",

      id: "9",
    },
  ];
  return (
    <div className="w-full h-full">
      <p className="uppercase font-bold mt-4">Lịch sử đơn hàng</p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Mã ID đơn hàng
              </th>
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Khách hàng
              </th>
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Số Sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Tình trạng
              </th>
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Tổng Tiền
              </th>
              <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                Ngày tạo
              </th>
              {/* <th scope="col" className="px-6 py-3 hover:text-[#FFBA00]">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {dataOrder.map((item, index) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#FFBA00] dark:hover:bg-gray-600 group">
                  <th
                    scope="row"
                    className="px-6 py-4 font-thin text-gray-900 whitespace-nowrap dark:text-white group-hover:font-semibold group-hover:text-black"
                  >
                    #{item.id}
                  </th>

                  <td className="px-6 py-4 group-hover:font-semibold group-hover:text-black">
                    {item.customers}
                  </td>
                  <td className="px-6 py-4 group-hover:font-semibold group-hover:text-black">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 group-hover:font-semibold group-hover:text-black">
                    {item.status === 1
                      ? "Đang xử lý"
                      : item.status === 2
                      ? "Đang vận chuyển"
                      : item.status === 3
                      ? "Đang giao"
                      : item.status === 4
                      ? "Hoàn thành"
                      : item.status === 5
                      ? "Đã hủy"
                      : "Trả hàng"}
                  </td>
                  <td className="px-6 py-4 group-hover:font-semibold group-hover:text-black">
                    {item.totalMoney} đ
                  </td>
                  <td className="px-6 py-4 group-hover:font-semibold group-hover:text-black">
                    {item.date}{" "}
                  </td>
                  <td className="px-6 py-4 text-right group-hover:font-semibold group-hover:text-black">
                    <a
                      onClick={() => {
                        navigate(path.detailOrder, { state: item });
                      }}
                      className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Xem
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryOrder;
