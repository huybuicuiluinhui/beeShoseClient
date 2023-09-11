import React from "react";
import { useNavigate } from "react-router-dom";
import path from "../../../constants/path";

const Address = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <p className="uppercase font-bold mt-4">Địa chỉ</p>
      <div className="border-[1px] border-gray-200 flex p-2 ">
        <div className="w-[80%]">
          <p className="text-base text-gray-700">Họ và tên: Thế Huy</p>
          <p className="text-base text-gray-700">Email: huybui@gmail.com</p>
          <p>Số điện thoại: 0987654321</p>
          <p>Địa chỉ: 66a, ngõ 2, Nguyên Xá, MK,HN</p>
        </div>
        <div className="w-[20%] flex justify-around  items-center">
          <button className="bg-[#FFBA00] h-fit p-2  rounded px-4">
            <span>Sửa</span>
          </button>
          <button className="bg-[#CC041A] h-fit p-2 rounded px-4">
            <span>Xóa</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-3 ">
        <button
          className="w-[45%] border-[1px]  "
          onClick={() => {
            return navigate(-1);
          }}
        >
          <p className="uppercase text-center">Quay lại</p>
        </button>
        <button
          className="w-[45%] border-[1px] "
          onClick={() => {
            return navigate(-1);
          }}
        >
          <p
            className="uppercase text-center  font-semibold"
            onClick={() => {
              navigate(path.addAddress);
            }}
          >
            Thêm địa chỉ mới
          </p>
        </button>
      </div>
    </div>
  );
};

export default Address;
