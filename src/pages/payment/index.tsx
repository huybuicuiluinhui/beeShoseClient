import React, { useState, useEffect } from "react";
import Images from "../../static";
import { Toast } from "flowbite-react";
import SimpleToast from "../../components/Toast";
import ShippingProcess from "../../components/shippingProcess";
import path from "../../constants/path";
import { useNavigate, useLocation } from "react-router-dom";
import * as request from "../../utils/http";
import axios from "axios";
import {
  IIForDetailShoe,
  IListDeatilShoe,
  IVoucher,
} from "../../types/product.type";
import { convertToCurrencyString } from "../../utils/format";
import { useShoppingCart } from "../../context/shoppingCart.context";
import { formatCurrency } from "../../utils/formatCurrency";
import API from "../../api";
interface Province {
  ProvinceID: number;
  ProvinceName: string;
}

interface District {
  DistrictID: number;
  DistrictName: string;
}

interface Ward {
  WardCode: number;
  WardName: string;
}

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useShoppingCart();
  const [radioChoose, setRadioChoose] = React.useState<string>("option1");
  const [voucher, setVoucher] = useState<IVoucher[]>();
  const [showToast, setShowToast] = React.useState<boolean>(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>();
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number>();
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<number>();
  const [arrShoes, setArrShoes] = useState<any[]>(
    location?.state?.infoShoeList
  );
  const [listDetailShoe, setListDetailShoe] = useState<IListDeatilShoe[]>();
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

  const configApi = {
    headers: {
      Token: "aef361b5-f26a-11ed-bc91-ba0234fcde32",
      "Content-Type": "application/json",
      ShopId: 124173,
    },
  };
  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        configApi
      );
      setProvinces(response.data.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Hàm lấy danh sách các quận huyện theo tỉnh
  const fetchDistrictsByProvince = async (provinceId: number) => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
        configApi
      );
      setDistricts(response.data.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  // Hàm lấy danh sách các phường xã theo quận huyện
  const fetchWardsByDistrict = async (districtId: number) => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
        configApi
      );
      setWards(response.data.data);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  // Sử dụng useEffect để gọi hàm lấy danh sách tỉnh khi component được mount
  useEffect(() => {
    getDetailShoe();
    fetchProvinces();
    getVoucher();
  }, []);

  // Sử dụng useEffect để gọi hàm lấy danh sách quận huyện khi selectedProvince thay đổi
  useEffect(() => {
    if (selectedProvince) {
      fetchDistrictsByProvince(selectedProvince);
    }
  }, [selectedProvince]);

  // Sử dụng useEffect để gọi hàm lấy danh sách phường xã khi selectedDistrict thay đổi
  useEffect(() => {
    if (selectedDistrict) {
      fetchWardsByDistrict(selectedDistrict);
    }
  }, [selectedDistrict]);

  const handleChange = (event: any) => {
    setRadioChoose(event.target.value);
  };

  return (
    <div className="w-full h-full">
      <ShippingProcess type={2} />
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 shadow-md my-10">
        <div className="px-4 ">
          <p className="text-xl font-medium text-gray-600">Thông báo</p>
          <p className="text-gray-400">
            Kiểm tra các mặt hàng của bạn. Và chọn một phương thức vận chuyển
            phù hợp.
          </p>
          {!!arrShoes && !!arrShoes.length ? (
            <div className="mt-8 space-y-3 rounded-lg border bg-white  border-[#ffba00]">
              {arrShoes.map((item, index) => {
                return (
                  <div
                    className={`flex px-6 py-2 w-full  ${
                      index === arrShoes.length
                    } ? "": "border-b-[2px] border-dotted  border-[#ffba00]`}
                  >
                    {/* product */}
                    {
                      <img
                        className="h-auto w-[20%] object-cpnatin"
                        src={item?.infoShoe?.images[0]?.name}
                      />
                    }
                    <div className="w-full">
                      <div
                        className="flex flex-col justify-between ml-4 flex-grow w-full h-full cursor-pointer"
                        onClick={() => {
                          navigate(path.product, { state: item?.infoShoe?.id });
                        }}
                      >
                        <span className="font-bold text-sm underline ">
                          {item?.infoShoe?.shoe?.name}-
                          {item?.infoShoe?.color?.name}-
                          {item?.infoShoe?.size?.name}
                        </span>
                        <span className="text-red-500 text-xs">
                          {item?.infoShoe?.shoe?.brand?.name}
                        </span>
                        <div className="w-full flex">
                          <span className=" w-[50%]  text-xs font-semibold ">
                            x{item?.quantity}
                          </span>
                          <span className="text-center  font-semibold text-sm w-[50%]">
                            {convertToCurrencyString(
                              item?.infoShoe?.price * item?.quantity
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                loading...
              </div>
            </div>
          )}
          <p className="mt-8 text-lg font-medium text-[#FFBA00]">
            Phương thức giao hàng
          </p>
          <form className="mt-5 grid gap-6 mb-10">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                defaultChecked
              />
              <span className="peer-checked:border-[#FFBA00] absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
              <label
                className="peer-checked:border-2 peer-checked:border-[#FFBA00] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src={Images.iconDeliveryFash}
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Giao trong ngày</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Vận chuyển: 1h- 1 ngày
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                defaultChecked
              />
              <span className="peer-checked:border-[#FFBA00] absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
              <label
                className="peer-checked:border-2 peer-checked:border-[#FFBA00] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img className="w-14 object-contain" src={Images.iconDivery} />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Giao hàng nhanh</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Vận chuyển: 2-4 ngày
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        {/* Thanh toán */}
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium  ">Chi tiết thanh toán</p>
          <p className="text-gray-400">
            Hoàn thành đơn đặt hàng của bạn bằng cách cung cấp chi tiết thanh
            toán của bạn.
          </p>
          <div className="mt-2">
            <div className="flex justify-between w-full px-4 my-5">
              <div className="relative z-0  w-[45%]">
                <input
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập họ và tên
                </label>
              </div>
              <div className="relative z-0 w-[45%] ">
                <input
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập số điện thoại
                </label>
              </div>
            </div>
            <div className="flex justify-between w-full px-4 my-3">
              <div className="relative z-0  w-[45%] ">
                <div>
                  <select
                    value={selectedProvince}
                    onChange={(e: any) => setSelectedProvince(e.target.value)}
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    {provinces.map((province) => (
                      <option
                        key={province.ProvinceID}
                        value={province.ProvinceID}
                      >
                        {province.ProvinceName}
                      </option>
                    ))}
                  </select>
                </div>

                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập Tỉnh/Thành Phố
                </label>
              </div>
              <div className="relative z-0  w-[45%] ">
                <div>
                  <select
                    value={selectedDistrict}
                    onChange={(e: any) => setSelectedDistrict(e.target.value)}
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    {districts.map((district) => (
                      <option
                        key={district.DistrictID}
                        value={district.DistrictID.toString()}
                      >
                        {district.DistrictName}
                      </option>
                    ))}
                  </select>
                </div>

                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập Quận/Huyện
                </label>
              </div>
            </div>

            <div className="flex justify-between w-full px-4 my-5">
              <div className="relative z-0  w-[45%] ">
                <div>
                  <select
                    value={selectedWard}
                    //  value={selectedDistrict}
                    onChange={(e: any) => setSelectedWard(e.target.value)}
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    {wards.map((ward) => (
                      <option
                        key={ward.WardCode}
                        value={ward.WardCode.toString()}
                      >
                        {ward.WardName}
                      </option>
                    ))}
                  </select>
                </div>

                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập Phường/Xã
                </label>
              </div>
              <div className="relative z-0  w-[45%]">
                <input
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập địa chỉ cụ thể
                </label>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium text-[#FFBA00]"
            >
              Chọn phương thức thanh toán
            </label>
            <div className="flex">
              <div className="flex items-center h-5">
                <input
                  checked={radioChoose === "option1"}
                  onChange={handleChange}
                  value={"option1"}
                  name="payment"
                  id="option1"
                  aria-describedby="helper-radio-text"
                  type="radio"
                  className=" peer-checked:border-[#FFBA00]   peer-checked:ring-[#FFBA00] w-4 h-4 text-[#FFBA00] bg-gray-100 border-gray-300 focus:ring-[#FFBA00]  "
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  htmlFor="option1"
                  className="font-medium text-gray-900  peer-checked:text-[#FFBA00] "
                >
                  Thanh toán ngay
                </label>
                <p
                  id="helper-radio-text"
                  className="text-xs font-normal text-gray-500 dark:text-gray-300"
                >
                  Miễn phí cho đơn hàng trên 1tr đồng
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center h-5">
                <input
                  value={"option2"}
                  checked={radioChoose === "option2"}
                  name="payment"
                  onChange={handleChange}
                  id="option2"
                  aria-describedby="helper-radio-text"
                  type="radio"
                  className=" peer-checked:border-[#FFBA00]  peer-checked: peer-checked:ring-[#FFBA00] w-4 h-4 text-[#FFBA00] bg-gray-100 border-gray-300 focus:ring-[#FFBA00]  "
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  htmlFor="option2"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Thanh toán khi nhận hàng
                </label>
              </div>
            </div>
            {radioChoose === "option1" && (
              <div>
                <label
                  htmlFor="card-holder"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Tên tài khoản
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="card-holder"
                    name="card-holder"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Hãy nhập tên tài khoản của bạn"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                      />
                    </svg>
                  </div>
                </div>
                <label
                  htmlFor="card-no"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Số tài khoản
                </label>
                <div className="flex">
                  <div className="relative w-7/12 flex-shrink-0">
                    <input
                      type="text"
                      id="card-no"
                      name="card-no"
                      className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                      </svg>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="credit-expiry"
                    className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="MM/YY"
                  />
                  <input
                    type="text"
                    name="credit-cvc"
                    className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="CVC"
                  />
                </div>
              </div>
            )}
            {/* Total */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Tổng tiền hàng
                </p>
                {!!listDetailShoe && (
                  <p className="font-normal text-gray-900">
                    {formatCurrency(
                      cartItems.reduce((total, cartItem) => {
                        const item = listDetailShoe.find(
                          (i) => i.id === cartItem.id
                        );
                        return total + (item?.price || 0) * cartItem.quantity;
                      }, 0)
                    )}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Tổng phí vận chuyển
                </p>
                <p className="font-normal text-gray-900">8.000đ</p>
              </div>
              {!!listDetailShoe && !!location?.state?.totalPercent ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Giảm giá voucher
                  </p>
                  <p className="font-normal text-gray-900">
                    - {formatCurrency(location?.state?.totalPercent)}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Giảm giá voucher
                  </p>
                  <p className="font-normal text-gray-900">
                    - {formatCurrency(0)}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                Tổng thanh toán
              </p>
              {!!listDetailShoe && !!location?.state?.totalPercent ? (
                <p className="text-2xl font-semibold text-red-500">
                  {formatCurrency(
                    location?.state?.total - location?.state?.totalPercent
                  )}
                </p>
              ) : (
                <p className="text-2xl font-semibold text-red-500">
                  {formatCurrency(location?.state?.total)}
                </p>
              )}
            </div>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-[#FFBA00] px-6 py-3 font-medium text-white"
            onClick={() => {
              setShowToast(true);
              navigate(path.home);
            }}
          >
            Đặt hàng
          </button>
        </div>
      </div>
      {showToast && (
        <SimpleToast typeToast="success" message="Đặt hàng thành công" />
      )}
    </div>
  );
};

export default PaymentPage;
