import React from "react";
import Images from "../../static";
import { useNavigate } from "react-router-dom";
import path from "../../constants/path";
import ShippingProcess from "../../components/shippingProcess";

const CartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto mt-2">
      <ShippingProcess type={1} />
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl uppercase">Giỏ hàng</h1>
            <h2 className="font-semibold text-2xl uppercase">3 sản phẩm</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Thông tin chi tiết sản phẩm
            </h3>
            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
              Số lượng
            </h3>
            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
              Giá
            </h3>
            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
              Tổng tiền
            </h3>
          </div>
          <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
              {/* product */}
              <div className="w-20">
                <img className="h-24" src={Images.giay01} />
              </div>
              <div className="flex flex-col justify-between ml-4 flex-grow">
                <span className="font-bold text-sm">Giày adidas</span>
                <span className="text-red-500 text-xs">Adidas</span>
                <a
                  href="#"
                  className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                >
                  Xóa
                </a>
              </div>
            </div>
            <div className="flex justify-center w-1/5">
              <svg
                className="fill-current text-gray-600 w-3"
                viewBox="0 0 448 512"
              >
                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
              <input
                className="mx-2 border text-center w-10"
                type="text"
                defaultValue={1}
              />
              <svg
                className="fill-current text-gray-600 w-3"
                viewBox="0 0 448 512"
              >
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">
              40.000.000đ
            </span>
            <span className="text-center w-1/5 font-semibold text-sm">
              40.000.000đ
            </span>
          </div>
          <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
              {" "}
              {/* product */}
              <div className="w-20">
                <img className="h-24" src={Images.giay01} />
              </div>
              <div className="flex flex-col justify-between ml-4 flex-grow">
                <span className="font-bold text-sm">Giày nike</span>
                <span className="text-red-500 text-xs">Nai kì</span>
                <a
                  href="#"
                  className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                >
                  Xóa
                </a>
              </div>
            </div>
            <div className="flex justify-center w-1/5">
              <svg
                className="fill-current text-gray-600 w-3"
                viewBox="0 0 448 512"
              >
                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
              <input
                className="mx-2 border text-center w-10"
                type="text"
                defaultValue={1}
              />
              <svg
                className="fill-current text-gray-600 w-3"
                viewBox="0 0 448 512"
              >
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">
              400.000.000đ
            </span>
            <span className="text-center w-1/5 font-semibold text-sm">
              400.000.000đ
            </span>
          </div>
          <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
              {" "}
              {/* product */}
              <div className="w-20">
                <img className="h-24" src={Images.giay01} />
              </div>
              <div className="flex flex-col justify-between ml-4 flex-grow">
                <span className="font-bold text-sm">Giày balen</span>
                <span className="text-red-500 text-xs">Ukaraine</span>
                <a
                  href="#"
                  className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                >
                  Xóa
                </a>
              </div>
            </div>
            <div className="flex justify-center w-1/5">
              <svg
                className="fill-current text-gray-600 w-3"
                viewBox="0 0 448 512"
              >
                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
              <input
                className="mx-2 border text-center w-10"
                type="text"
                defaultValue={1}
              />
              <svg
                className="fill-current text-gray-600 w-3"
                viewBox="0 0 448 512"
              >
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">
              40.000.000đ
            </span>
            <span className="text-center w-1/5 font-semibold text-sm">
              40.000.000đ
            </span>
          </div>
          <a
            href="#"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Tiếp tục mua sắm
          </a>
        </div>
        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8 uppercase">
            Thêm voucher
          </h1>

          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase mt-8  ">
              Voucher của bạn
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Giảm ngay-10.000đ cho đơn trên 1 tỷ</option>
            </select>
          </div>
          <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Nhập mã voucher ngay
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Áp dụng
          </button>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">3 sản phẩm</span>
            <span className="font-semibold text-sm"> 40.000.000đ</span>
          </div>
          <div className="border-t ">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Tổng thanh toán</span>
              <span> 40.000.000đ</span>
            </div>
            <button
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
              onClick={() => navigate(path.payment)}
            >
              Mua hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
