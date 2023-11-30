import React, { useEffect, useState } from "react";
import ShippingProcess from "../../components/shippingProcess";
import Images from "../../static";
import { useShoppingCart } from "../../context/shoppingCart.context";
import {
  District,
  IAddress,
  IDetailProductCart,
  Province,
  Ward,
} from "../../types/product.type";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API, { baseUrl } from "../../api";
import { formatCurrency } from "../../utils/formatCurrency";
import { calculateTotalDone } from "../../utils/format";
import { toast } from "react-toastify";
import path from "../../constants/path";
import ModalComponent from "../../components/Modal";
const PayMentWithUser = () => {
  const navigate = useNavigate();
  const { userPrf } = useShoppingCart();
  const [listProducts, setListProducts] = useState<IDetailProductCart[]>();
  const [dataAddress, setDataAddress] = useState<IAddress[]>();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>();
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number>();
  const [wards, setWards] = useState<Ward[]>([]);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [selectedWard, setSelectedWard] = useState<number>();
  const [method, setMethod] = useState<number>(0);
  const [feeShip, setFeeShip] = useState();
  const [showModal, setShowModal] = useState<boolean>(true);
  const getListDetailCart = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getListDetailCart(Number(userPrf?.id)),
      });
      if (res.status) {
        setListProducts(res?.data);
      }
    } catch (error) {
      console.log(error);
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
      setProvinces(response?.data?.data);
      setSelectedProvince(response?.data?.data[0]?.ProvinceID);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
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
  const caculateFee = async () => {
    if (!!dataAddress && dataAddress.length > 0) {
      console.log("ahihih");
      try {
        const response = await axios.post(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
          {
            service_id: 53320,
            service_type_id: null,
            to_district_id: Number(dataAddress[0].district),
            to_ward_code: dataAddress[0].ward,
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
    } else {
      return;
    }
  };
  const postBill = async () => {
    if (!!dataAddress && dataAddress.length > 0 && !!listProducts) {
      try {
        const response = await axios.post(
          baseUrl + "api/bill/create-bill-client",
          {
            account: userPrf?.id,
            customerName: dataAddress[0].name,
            email: userPrf?.email,
            district: dataAddress[0].district,
            province: dataAddress[0].province,
            ward: dataAddress[0].ward,
            specificAddress: dataAddress[0].specificAddress,
            moneyShip: feeShip,
            moneyReduce: (10 / 100) * calculateTotalDone(listProducts),
            totalMoney:
              calculateTotalDone(listProducts) + Number(feeShip ? feeShip : 0),

            note: "",
            paymentMethod: method,
            // carts: ,
          }
        );
        if (response.status) {
          toast.success("Đặt hàng thành công");
          navigate(path.home);
          // clearCart();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    caculateFee();
  }, [dataAddress]);
  const loadAddress = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getAddress(Number(userPrf?.id)),
      });
      if (res.data) {
        setDataAddress(res?.data?.content);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProvinces();
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
    loadAddress();
  }, [userPrf?.id]);
  useEffect(() => {
    getListDetailCart();
  }, [userPrf]);
  const provinceName = (mang: Province[], idCanTim: number) => {
    const doiTuongCanTim = mang.find((item) => item.ProvinceID === idCanTim);
    return doiTuongCanTim?.ProvinceName;
  };
  const districtName = (mang: District[], idCanTim: number) => {
    const doiTuongCanTim = mang.find((item) => item.DistrictID === idCanTim);
    return doiTuongCanTim?.DistrictName;
  };
  const wardName = (mang: Ward[], idCanTim: number) => {
    const doiTuongCanTim = mang.find(
      (item) => Number(item.WardCode) === Number(idCanTim)
    );
    return doiTuongCanTim?.WardName;
  };
  return (
    <div className="w-full h-full">
      <ShippingProcess type={2} />
      <div className="w-full h-full min-h-screen mt-5">
        <div className="w-full mx-auto pb-4 bg-white shadow-md rounded-sm">
          <div className="flex items-center w-full justify-between flex-nowrap">
            {Array(15)
              .fill({})
              .map((item, index) => {
                return (
                  <div
                    className="bg-gradient-to-r from-[#f102ff] to-[#f5033f] h-[2px] w-[5%]"
                    key={index}
                  />
                );
              })}
          </div>
          {!!dataAddress && dataAddress.length > 0 ? (
            <div className="w-full m-4">
              <div className="flex items-end">
                <img src={Images.iconAddressRed} alt="" className="w-[20px]" />
                <span className="font-medium text-sm ml-2 text-red-600 mr-2">
                  Địa chỉ nhận hàng
                </span>
              </div>
              <div className="flex gap-3 mt-2">
                <span className="text-sm font-semibold text-black ">
                  {dataAddress[0].name}
                </span>
                <span className="text-sm font-normal text-black ">
                  {wardName(wards, Number(dataAddress[0]?.ward))},
                  {districtName(districts, Number(dataAddress[0]?.district))},
                  {provinceName(provinces, Number(dataAddress[0]?.province))}
                </span>
                <button className="border-red-500 px-1 text-xs  border-[1px] text-red-500 ">
                  Mặc định
                </button>
                <button
                  className=" px-1 text-blue-500 text-xs"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Thay đổi
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-full mx-auto  bg-white shadow-md rounded-sm p-4 mt-5">
          <div className="relative overflow-x-auto  sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-400 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Đơn giá
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Thành tiền
                  </th>
                </tr>
              </thead>

              <tbody>
                {!!listProducts &&
                  listProducts.length > 0 &&
                  listProducts.map((item, index) => {
                    return (
                      <tr
                        className={`bg-white   hover:bg-gray-50 ${
                          index + 1 === listProducts.length ? "" : "border-b"
                        }`}
                        key={index}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex"
                        >
                          <img
                            src={item.image}
                            className="h-[80px] w-[80px]  object-contain mr-2"
                          />
                          <div className="flex flex-col justify-items-start">
                            <span className="text-sm text-black font-medium">
                              {item.name}
                            </span>
                            <span className="text-sm text-black font-medium">
                              {item.sole}
                            </span>
                          </div>
                        </th>
                        <td className="px-6 py-4">đây là size</td>
                        <td className="px-6 py-4">{item.quantity}</td>
                        <td className="px-6 py-4">
                          {!!item.discountValue
                            ? formatCurrency(item.discountValue)
                            : formatCurrency(item.price)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a
                            href="#"
                            className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                          >
                            {!!item.discountValue
                              ? formatCurrency(
                                  item.quantity * item.discountValue
                                )
                              : formatCurrency(item.price * item.quantity)}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full bg-white  mt-5 shadow-md p-4 rounded-sm flex justify-between">
          <div className="flex items-center gap-2">
            <img
              src={Images.iconVoucher}
              alt=""
              className="w-10 object-contain h-auto "
            />
            <span className="text-base font-normal text-red-500">
              Kho voucher
            </span>
          </div>
          <button className="text-sm font-medium text-red-500">
            Chọn voucher
          </button>
        </div>
        <div className="w-full bg-white  mt-5 shadow-md  rounded-sm relative ">
          <div className=" flex justify-between p-4">
            <span>Phương thức thanh toán</span>
            <div className="flex items-center gap-6">
              <button
                className={`border-[1px]  text-sm px-2 py-1 rounded ${
                  method === 1 ? "border-red-500" : ""
                } `}
                onClick={() => setMethod(0)}
              >
                Thanh toán khi nhận hàng{" "}
              </button>
              <button
                className={`border-[1px]  text-sm px-2 py-1 rounded ${
                  method === 2 ? "border-red-500" : ""
                } `}
                onClick={() => setMethod(1)}
              >
                Thay toán ngay bằng vnpay{" "}
              </button>
            </div>
          </div>
          <div className="w-full h-[2px] border-b-[1px] border-dashed border-gray-400" />
          <div className="flex  justify-between  my-3">
            <div></div>
            <div className="w-[20%] flex items-center justify-between mx-5">
              <span className="text-gray-400  text-sm font-normal">
                Tổng tiền hàng{" "}
              </span>
              {!!listProducts && listProducts.length > 0 && (
                <span className="text-red-400  text-sm font-medium">
                  {formatCurrency(calculateTotalDone(listProducts))}
                </span>
              )}
            </div>
          </div>
          <div className="flex  justify-between my-3">
            <div></div>
            <div className="w-[20%] flex items-center justify-between mx-5">
              <span className="text-gray-400  text-sm font-normal">
                Phí vận chuyển
              </span>
              <span className="text-red-400  text-sm font-medium">
                {" "}
                {formatCurrency(feeShip ? feeShip : 0)}
              </span>
            </div>
          </div>
          <div className="flex  justify-between my-3">
            <div></div>
            <div className="w-[20%] flex items-center justify-between mx-5">
              <span className="text-gray-400  text-sm font-normal">
                Tổng thanh toán
              </span>
              <span className="text-red-400  text-sm font-medium">1000000</span>
            </div>
          </div>
          <div className="w-full h-[2px] border-b-[1px] border-dashed border-gray-400" />
          <div className="w-full py-5 flex items-center justify-between px-4">
            <span>
              Nhấn "Đặt Hàng" đồng nghĩa với việc bạn đồng ý với các điều khoản
              của BeeShoe
            </span>
            <button
              className="bg-red-600 text-white text-base font-medium px-5 py-2"
              onClick={() => {
                postBill();
              }}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalComponent
          check={false}
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <div className="bg-white ">
            <div className="border-b-[1px] border-b-gray-400 border-dashed w-full p-2">
              <span>Địa Chỉ Của Tôi</span>
            </div>
            {!!dataAddress &&
              dataAddress.length > 0 &&
              dataAddress.map((item, index) => {
                return (
                  <div
                    className={`flex items-center  py-5 px-5
                      border-b-[1px] border-dashed border-gray-500
                 `}
                  >
                    <input
                      id={`default-radio-${index}`}
                      type="radio"
                      name="default-radio"
                      className="w-4 h-4 text-gray-500 bg-gray-100   "
                    />
                    <div className="flex w-full justify-between ml-2">
                      <div className="flex flex-col w-full  ">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            {" "}
                            <span className="text-sm font-medium ">
                              {item.name}
                            </span>
                            <div className="border-l-[1px] border-l-gray-400 ml-2 pl-2 text-xs text-gray-500">
                              {item.phoneNumber}
                            </div>
                          </div>
                          <button className="text-blue-500 text-sm">
                            Cập nhật
                          </button>
                        </div>
                        <span className="text-gray-500 text-sm ">
                          {wardName(wards, Number(item?.ward))},
                          {districtName(districts, Number(item?.district))},
                          {provinceName(provinces, Number(item?.province))}
                        </span>
                        {!!item.defaultAddress && (
                          <button className="border-red-500 px-1 text-xs  border-[1px] text-red-500 w-fit">
                            Mặc định
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="w-full flex items-center p-4  justify-around">
              <button
                className="border-red-500 border-[1px] py-[2px] px-3 text-red-500 "
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Hủy
              </button>
              <button className="bg-red-500 border-[1px] py-1 px-2 text-white">
                Xác nhận
              </button>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default PayMentWithUser;
