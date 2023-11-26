import React, { useState, useEffect } from "react";
import ShippingProcess from "../../components/shippingProcess";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { IListDeatilShoe, IVoucher } from "../../types/product.type";
import { convertToCurrencyString, toSlug } from "../../utils/format";
import { useShoppingCart } from "../../context/shoppingCart.context";
import { formatCurrency } from "../../utils/formatCurrency";
import API, { baseUrl } from "../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import path from "../../constants/path";
import ModalComponent from "../../components/Modal";
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
  const { cartItems, clearCart } = useShoppingCart();
  const [selected, setSelected] = useState("");
  const [showModal, setShowMoal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState<boolean>(true);
  const [openList, setOpenList] = useState<boolean>(false);
  const [percent, setPrecent] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [radioChoose, setRadioChoose] = React.useState<string>("option1");
  const [voucher, setVoucher] = useState<IVoucher[]>();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>();
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number>();
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<number>();
  const [specificAddress, setSpecificAddress] = useState<string>(" ");
  const [quantity, setQuantity] = useState<number>();
  const [code, setCode] = useState<string>();
  const [arrShoes, setArrShoes] = useState<any[]>(
    location?.state?.infoShoeList
  );
  const [feeShip, setFeeShip] = useState();
  const [listDetailShoe, setListDetailShoe] = useState<IListDeatilShoe[]>();
  const [textHVT, setTextHVT] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<number>(1);
  console.log(location);
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
      url: API.getVoucherSearch(inputValue),
    });
    if (res.status) {
      setVoucher(res?.data?.data);
    }
  };
  function isValidEmail(email: string) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }
  const postBill = async () => {
    if (textHVT === "" || textHVT === null || textHVT === undefined) {
      toast.warning("Không được để trống họ và tên");
    } else if (email === "" || email === null || email === undefined) {
      toast.warning("Không được để email");
    } else if (!isValidEmail(email)) {
      toast.warning("Email không hợp lệ");
    } else if (
      selectedDistrict === null ||
      selectedDistrict === undefined ||
      selectedProvince === null ||
      selectedProvince === undefined ||
      selectedWard === null ||
      selectedWard === undefined ||
      specificAddress === null ||
      specificAddress === undefined ||
      specificAddress === " "
    ) {
      toast.warning("Không được để trống địa chỉ");
    } else if (paymentMethod === null || paymentMethod === undefined) {
      toast.warning("Hãy chọn phương thức thanh toán");
    } else {
      try {
        const response = await axios.post(
          baseUrl + "api/bill/create-bill-client",
          {
            customerName: textHVT,
            email: email,
            district: selectedDistrict,
            province: selectedProvince,
            ward: selectedWard,
            specificAddress: specificAddress,
            moneyShip: feeShip,
            moneyReduce: (percent / 100) * location?.state?.total,
            totalMoney:
              Number(location?.state?.total) +
              Number(feeShip ? feeShip : 0) -
              (percent / 100) * location?.state?.total,
            note: note,
            paymentMethod: paymentMethod,
            carts: cartItems,
          }
        );
        if (response.status) {
          toast.success("Đặt hàng thành công");
          navigate(path.home);
          clearCart();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const configApi = {
    headers: {
      Token: "aef361b5-f26a-11ed-bc91-ba0234fcde32",
      "Content-Type": "application/json",
      ShopId: 124173,
    },
  };
  const caculateFee = async () => {
    try {
      const response = await axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        {
          service_id: 53320,
          service_type_id: null,
          to_district_id: Number(selectedDistrict),
          to_ward_code: selectedWard,
          height: 50,
          length: 20,
          weight: 200,
          width: 20,
          cod_failed_amount: 2000,
          insurance_value: 10000,
          coupon: null,
        },
        {
          headers: {
            Token: "aef361b5-f26a-11ed-bc91-ba0234fcde32",
            "Content-Type": "application/json",
            ShopId: 124173,
          },
        }
      );
      setFeeShip(response?.data?.data?.total);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        configApi
      );
      setProvinces(response?.data?.data);
      setSelectedProvince(response?.data?.data[0]?.ProvinceID);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // Hàm lấy danh sách các quận huyện theo tỉnh
  const fetchDistrictsByProvince = async (provinceId: number) => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
        configApi
      );
      setDistricts(response?.data?.data);
      setSelectedDistrict(response?.data?.data[0]?.DistrictID);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchWardsByDistrict = async (districtId: number) => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
        configApi
      );
      setWards(response.data.data);
      setSelectedWard(response?.data?.data[0]?.WardCode);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };
  useEffect(() => {
    getDetailShoe();
    fetchProvinces();
    getVoucher();
  }, []);
  useEffect(() => {
    if (selectedProvince) {
      fetchDistrictsByProvince(selectedProvince);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWardsByDistrict(selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedWard !== undefined) {
      caculateFee();
    } else {
      return;
    }
  }, [selectedWard]);

  const handleChange = (event: any) => {
    setRadioChoose(event?.target?.value);
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
            <div className="mt-8 space-y-3 rounded-lg border bg-white  ">
              {arrShoes.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`flex px-6 py-2 w-full  ${
                      index === arrShoes.length - 1
                    } ? "": " border-b-[1px] border-dotted  border-gray-200`}
                  >
                    {
                      <LazyLoadImage
                        className="h-auto w-[20%] object-cpnatin"
                        src={item?.infoShoe?.images[0]?.name}
                      />
                    }
                    <div className="w-full">
                      <div className="flex flex-col justify-between ml-4 flex-grow w-full h-full cursor-pointer">
                        <span className="font-bold text-sm  ">
                          {item?.infoShoe?.shoe?.name}-
                          {item?.infoShoe?.color?.name}-
                          {item?.infoShoe?.size?.name}
                        </span>
                        <span className="text-red-500 text-xs font-medium">
                          Thương hiệu: {item?.infoShoe?.shoe?.brand?.name}
                        </span>
                        <div className="w-full flex">
                          <span className=" w-[50%] text-xs font-medium  text-[#333333]  ">
                            <span className="text-[#666666] text-xs font-medium">
                              {" "}
                              Số lượng:
                            </span>{" "}
                            {item?.quantity}
                          </span>
                          <span className="text-center  font-medium text-xs w-[50%] text-[#333333]">
                            <span className="text-[#666666]">Thành tiền: </span>
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
              <div className="px-3 py-1 text-xs font-medium leading-none text-center text-gray-800 bg-gray-200 rounded-full animate-pulse dark:bg-gray-900 dark:text-gray-200">
                loading...
              </div>
            </div>
          )}

          <div className=" w-full font-medium ">
            <div
              className={`bg-white w-full  flex items-center justify-between rounded my-3 `}
            >
              MÃ GIẢM GIÁ
            </div>
            <div className="w-full bg-white ">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e?.target?.value.toLowerCase());
                }}
                onClick={() => setOpenList(true)}
                placeholder="Hãy nhập mã voucher của bạn vào đây..."
                className="placeholder:text-gray-700 p-2 w-full rounded-t-[4px] border-gray-200 "
              />
              .
            </div>
            <div
              className={`w-full  mt-2  ${
                open ? "max-h-60" : "max-h-0"
              } overflow-y-auto`}
            >
              {!!openList &&
                voucher?.map((voucher, index) => (
                  <div
                    key={index}
                    className={`w-full flex justify-between   hover:bg-[#f5f5f5] cursor-pointer mt-2 py-2  ${
                      voucher?.name?.toLowerCase() ===
                        selected?.toLowerCase() && "bg-[#f5f5f5] text-black"
                    }
        ${
          voucher?.name?.toLowerCase().startsWith(inputValue)
            ? "block"
            : "hidden"
        }`}
                    onClick={() => {
                      if (
                        voucher?.name?.toLowerCase() !==
                          selected.toLowerCase() &&
                        voucher?.minBillValue < location?.state?.total
                      ) {
                        setSelected(voucher?.name);
                        setPrecent(voucher?.percentReduce);
                        setInputValue(voucher?.name);
                        setMinPrice(voucher?.minBillValue);
                        setQuantity(voucher?.quantity);
                        setCode(voucher?.code);
                        toast.success("Áp dụng voucher thành công");
                      } else {
                        toast.warning("Bạn cần chọn voucher khác");
                      }
                    }}
                  >
                    <div className={`w-[50%] `}>
                      <div
                        key={voucher?.name}
                        className={`w-full  text-xs  text-[#BFAEE3] `}
                      >
                        {voucher?.name}
                      </div>

                      <p className="text-[10px] mt-2">
                        Phần trăm giảm: {voucher.percentReduce}%
                      </p>
                      <p className="text-[10px] mt-2">
                        Số lượng còn: {voucher.quantity}
                      </p>
                    </div>
                    <div className={`w-[50%] flex flex-col justify-between `}>
                      <div
                        key={voucher?.name}
                        className={`w-full  text-[8px]   `}
                      >
                        Mã voucher: {voucher?.code}
                      </div>

                      <p className="text-[10px]">
                        Đơn tối thiểu:{" "}
                        <span className="text-red-400">
                          {convertToCurrencyString(voucher.minBillValue)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              {selected && percent && minPrice && quantity && (
                <div
                  className={`w-full flex justify-between   hover:bg-[#f5f5f5] cursor-pointer mt-2 py-2 `}
                >
                  <div className={`w-[50%] `}>
                    <div className={`w-full  text-xs  text-[#BFAEE3] `}>
                      {inputValue}
                    </div>

                    <p className="text-[10px] mt-2">
                      Phần trăm giảm: {percent}%
                    </p>
                    <p className="text-[10px] mt-2">Số lượng còn: {quantity}</p>
                  </div>
                  <div className={`w-[50%] flex flex-col justify-between `}>
                    <div className={`w-full  text-[8px]   `}>
                      Mã voucher: {code}
                    </div>

                    <p className="text-[10px]">
                      Đơn tối thiểu:{" "}
                      <span className="text-red-400">
                        {convertToCurrencyString(minPrice)}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
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
                  value={textHVT}
                  onChange={(e) => {
                    setTextHVT(e?.target?.value);
                  }}
                  autoComplete="off"
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập họ và tên
                </label>
              </div>
              <div className="relative z-0 w-[45%] ">
                <input
                  autoComplete="off"
                  value={email}
                  onChange={(e) => {
                    setEmail(e?.target?.value);
                  }}
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập email
                </label>
              </div>
            </div>
            <div className="flex justify-between w-full px-4 my-3">
              <div className="relative z-0  w-[45%] ">
                <div>
                  <select
                    value={selectedProvince}
                    onChange={(e: any) => setSelectedProvince(e?.target?.value)}
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
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập Tỉnh/Thành Phố
                </label>
              </div>
              <div className="relative z-0  w-[45%] ">
                <div>
                  <select
                    value={selectedDistrict}
                    onChange={(e: any) => setSelectedDistrict(e?.target?.value)}
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
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    onChange={(e: any) => setSelectedWard(e?.target?.value)}
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
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập Phường/Xã
                </label>
              </div>
              <div className="relative z-0  w-[45%]">
                <input
                  value={specificAddress}
                  onChange={(e: any) => setSpecificAddress(e?.target?.value)}
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nhập địa chỉ cụ thể
                </label>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium text-gray-500"
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
                  className=" peer-checked:border-gray-500   peer-checked:ring-gray-500 w-4 h-4 text-gray-500 bg-gray-100 border-gray-300 focus:ring-gray-500  "
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  htmlFor="option1"
                  className="font-medium text-gray-900  peer-checked:text-gray-500 "
                >
                  Thanh toán ngay
                </label>
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
                  className=" peer-checked:border-gray-500  peer-checked: peer-checked:ring-gray-500 w-4 h-4 text-gray-500 bg-gray-100 border-gray-300 focus:ring-gray-500  "
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
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-gray-500 focus:ring-gray-500"
                    placeholder="Hãy nhập tên tài khoản của bạn"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
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
                      className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-gray-500 focus:ring-gray-500"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        className="h-4 w-4 text-gray-400"
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
                    className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-gray-500 focus:ring-gray-500"
                    placeholder="MM/YY"
                  />
                  <input
                    type="text"
                    name="credit-cvc"
                    className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-gray-500 focus:ring-gray-500"
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
                <p className="font-normal text-gray-900">
                  {formatCurrency(feeShip ? feeShip : 0)}
                </p>
              </div>
              {!!listDetailShoe && !!percent ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Giảm giá voucher
                  </p>
                  <p className="font-normal text-gray-900">
                    - {formatCurrency((percent / 100) * location?.state?.total)}
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
              {!!location?.state?.total || !!feeShip || !!percent ? (
                <p className="text-2xl font-semibold text-red-500">
                  {formatCurrency(
                    Number(location?.state?.total) +
                      Number(feeShip ? feeShip : 0) -
                      (percent / 100) * location?.state?.total
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
            className="mt-4 mb-8 w-full rounded-md bg-red-500 px-6 py-3 font-medium text-white"
            onClick={() => {
              setShowMoal(true);
            }}
          >
            Đặt hàng
          </button>
        </div>
      </div>
      {showModal && (
        <ModalComponent
          check={true}
          isVisible={showModal}
          onClose={() => {
            setShowMoal(false);
          }}
        >
          <div className="w-full flex flex-col justify-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
              Xác nhận đặt đơn hàng ?
            </h3>

            <div className="w-full flex justify-around items-center mb-2">
              <button
                onClick={() => {
                  setShowMoal(false);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-green-400  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 "
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  postBill();
                  setShowMoal(false);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default PaymentPage;
