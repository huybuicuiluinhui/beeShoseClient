import React, { useEffect, useState } from "react";
import API from "../../api";
import axios from "axios";

const LookUpOrders = () => {
  const [show, setShow] = useState(false);
  const [inputHD, setInputHD] = useState("");
  const getInfoDetailProduct = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getSearchBill(inputHD),
      });
      if (res.status) {
        console.log(res.data);
        //   setDetail(res)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInfoDetailProduct();
  }, [inputHD]);

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
      <p className="text-[rgba(68,73,77,1)] font-medium text-xl mt-5">
        Mã phiếu gửi
      </p>
      <input
        type="text"
        placeholder="VD: 123567"
        className="rounded border-[1px] mt-2 w-[40%] border-[#ccc]"
        value={inputHD}
      />
      <div className="mt-3">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded "
          onClick={() => {
            setShow(true);
          }}
        >
          Tra cứu
        </button>
      </div>
      {show && (
        <div className="w-full">
          <p className="font-semibold text-2xl my-2">Danh sách phiếu gửi</p>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Mã phiếu gửi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Người gửi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bưu cục nhận
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trọng lượng
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    170987654345678
                  </th>
                  <td className="px-6 py-4">10/10/2021</td>
                  <td className="px-6 py-4">Quận NTL</td>
                  <td className="px-6 py-4">10/10/2021</td>
                  <td className="px-6 py-4">Đang giao hàng</td>
                  <td className="px-6 py-4">69999</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <h1 className="text-lg font-bold mb-3">THÔNG TIN VẬN ĐƠN</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Mã phiếu gửi:
                    </label>
                    <p className="text-gray-700">1751015429162</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Khối lượng(Gram):
                    </label>
                    <p className="text-gray-700">5000</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Người gửi:
                    </label>
                    <p className="text-gray-700">
                      N***** - T.Nghệ An - H.Đô Lương
                    </p>
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
                      S***** - TP.Hà Nội - Q.Nam Từ Liêm
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Trạng thái:
                    </label>
                    <p className="text-gray-700">Đang giao hàng</p>
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
