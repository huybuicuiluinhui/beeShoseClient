import React, { useEffect, useState } from "react";
import { getCookie } from "../../../helper/CookiesRequest";
import { jwtDecode } from "jwt-decode";
interface User {
  id: string;
  email: string;
  role: string;
  fullName: string;
  avata: string;
  expirationTime: Date;
}
interface Iuser {
  id: string;
  email: string;
  role: string;
  fullName: string;
  avata: string;
  expirationTime: Date;
}
const InforMe = () => {
  //   const token = getCookie("userToken");
  //   const [user, setUser] = useState<Iuser>();
  //   const loadUser = () => {
  //     const decodedToken: {
  //       id: string;
  //       email: string;
  //       role: string;
  //       fullName: string;
  //       avata: string;
  //       exp: number;
  //     } = jwtDecode(token ? token : "");
  //     setUser({
  //       id: decodedToken?.id,
  //       email: decodedToken?.email,
  //       role: decodedToken?.role,
  //       fullName: decodedToken?.fullName,
  //       avata: decodedToken?.avata,
  //       expirationTime: new Date(decodedToken.exp * 1000),
  //     });
  //   };
  //   useEffect(() => {
  //     loadUser();
  //   }, [token]);
  // console.log("user", user);
  return (
    <div className="w-full h-full ">
      <div className="mb-2">
        <p className="font-semibold text-gray-800">Hồ sơ của tôi</p>
        <p className="text-sm text-gray-500">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
      </div>
      <div className=" w-[60%] mx-auto">
        <form>
          <div className="relative z-0 w-full mb-6 group">
            <div className="">
              Họ và tên:
              <input
                type="text"
                name="text"
                id="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <div>
              Giới tính
              <div className="flex items-center ps-4   rounded ">
                <input
                  id="bordered-radio-1"
                  type="radio"
                  name="bordered-radio"
                  className="w-4 h-4 text-gray-600 bg-gray-100"
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
                >
                  Nam
                </label>
                <input
                  defaultChecked
                  id="bordered-radio-2"
                  type="radio"
                  name="bordered-radio"
                  className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300"
                />
                <label
                  htmlFor="bordered-radio-2"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
                >
                  Nữ
                </label>
                <div className="flex items-center ps-4 border border-gray-200 rounded "></div>
              </div>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <div>
              Địa chỉ email
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            Số điện thoại
            <input
              type="tel"
              pattern="^0[0-9]{9}"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              required
            />
          </div>
          <div className=" mx-auto bg-white rounded ">
            <label
              htmlFor="datepicker"
              className="block text-sm font-medium text-gray-600"
            >
              Ngày sinh
            </label>
            <input
              type="date"
              id="datepicker"
              name="datepicker"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-gray-400 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default InforMe;
