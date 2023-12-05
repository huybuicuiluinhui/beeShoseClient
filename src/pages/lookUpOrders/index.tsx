import React, {
  DetailedHTMLProps,
  TdHTMLAttributes,
  useEffect,
  useState,
} from "react";
import API from "../../api";
import axios from "axios";
import Images from "../../static";
import { IBill } from "../../types/product.type";
import { formatCurrency } from "../../utils/formatCurrency";

const LookUpOrders = () => {
  const [inputHD, setInputHD] = useState<string>("");
  const [listDataBill, setListDataBill] = useState<IBill>();
  const getInfoDetailProduct = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getSearchBill(inputHD),
      });
      if (res.status) {
        setListDataBill(res.data);
        //   setDetail(res)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const timestampString = listDataBill?.createAt;
  const timestamp = new Date(String(timestampString));

  const day = timestamp.getDate();
  const month = timestamp.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
  const year = timestamp.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  return (
    <div className="w-full h-full bg-white min-h-screen">
      <div className="relative w-fit h-fit">
        <img
          src={
            "https://viettelpost.com.vn/wp-content/uploads/2021/02/1920px-Hong_Kong_Skyline_Panorama_-_Dec_200811.jpg"
          }
          className="w-full h-auto "
        />
        <div className="absolute top-[50%] right-[50%] translate-x-1/2 text-center -translate-y-1/2">
          <p className="text-white font-bold text-2xl uppercase  space-x-8 ">
            Tra cứu hành trình đơn hàng
          </p>
          <p className="text-white font-bold ">
            "Mạng chuyển phát nhanh rộng khắp nơi"
          </p>
        </div>
      </div>
      <div className="bg-[#f0f0f0] w-full px-4 py-2">
        Trang chủ / Tra cứu hành trình đơn hàng
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="w-[50%]">
          <p className="text-[rgba(68,73,77,1)] font-medium text-xl mt-5">
            Mã phiếu gửi
          </p>
          <input
            type="text"
            placeholder="VD: 123567"
            className="rounded border-[1px] mt-2 w-[60%] border-[#ccc]"
            value={inputHD}
            onChange={(e) => setInputHD(e.target.value)}
          />
          <div className="mt-3">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded "
              onClick={() => {
                getInfoDetailProduct();
              }}
            >
              Tra cứu
            </button>
          </div>
        </div>
        <div className="w-[50%]">
          <img src={Images.imgTrack} className="w-[220px] object-contain" />
        </div>
      </div>
      {listDataBill && (
        <div className="w-full">
          <p className="font-semibold text-2xl my-2">Danh sách phiếu gửi</p>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-white uppercase bg-gray-500  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Mã phiếu gửi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Người gửi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày tạo đơn
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phí ship
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {listDataBill?.code}
                  </th>
                  <td className="px-6 py-4">{listDataBill?.customer?.name}</td>
                  <td className="px-6 py-4">{formattedDate}</td>
                  <td className="px-6 py-4">
                    {listDataBill?.status === 2
                      ? "Chờ xác nhận"
                      : listDataBill.status === 4
                      ? "Chờ giao"
                      : listDataBill.status === 5
                      ? "Đang giao"
                      : listDataBill.status === 6
                      ? "Hoàn Thành"
                      : listDataBill.status === 7
                      ? "Đã hủy"
                      : ""}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(listDataBill.moneyShip)}{" "}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(listDataBill.totalMoney)}{" "}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="bg-[#f0f0f0] shadow-md rounded px-8 pt-6 pb-8 my-4">
              <div className="mb-4">
                <h1 className="text-lg font-bold mb-3">THÔNG TIN VẬN ĐƠN</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Mã phiếu gửi:
                    </label>
                    <p className="text-gray-700">{listDataBill.code}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Phí ship:
                    </label>
                    <p className="text-gray-700">
                      {formatCurrency(listDataBill.moneyShip)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Người gửi:
                    </label>
                    <p className="text-gray-700">Shop giày BeeShoe</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Dịch vụ:
                    </label>
                    <p className="text-gray-700">
                      Chuyển phát tiết kiệm hàng hóa
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Người nhận:
                    </label>
                    <p className="text-gray-700">
                      {listDataBill?.customer?.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Trạng thái:
                    </label>
                    <p className="text-gray-700">
                      {" "}
                      {listDataBill?.status === 2
                        ? "Chờ xác nhận"
                        : listDataBill.status === 4
                        ? "Chờ giao"
                        : listDataBill.status === 5
                        ? "Đang giao"
                        : listDataBill.status === 6
                        ? "Hoàn Thành"
                        : listDataBill.status === 7
                        ? "Đã hủy"
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LookUpOrders;
