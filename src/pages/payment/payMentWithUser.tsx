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
import { configApi } from "../../utils/config";
import ChangeAdr from "./changeAdr";
import ShowVoucher from "./showVoucher";
import AddAddressModal from "../information/address/modalAddAdr";
import { getCookie } from "../../helper/CookiesRequest";
import ShowVoucherWithMe from "./ShowVoucherWithMe";
const PayMentWithUser = () => {
  const navigate = useNavigate();
  const { userPrf, removeAllCart } = useShoppingCart();
  const [listProducts, setListProducts] = useState<IDetailProductCart[]>();
  const [dataAddress, setDataAddress] = useState<IAddress[]>();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>();
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number>();
  const [wards, setWards] = useState<Ward[]>([]);
  const [specificAddress, setSpecificAddress] = useState<string>();
  const [selectedWard, setSelectedWard] = useState<number>();
  const [selectedDefault, setSelectedDefault] = useState<boolean>();
  const [method, setMethod] = useState<number>(0);
  const [feeShip, setFeeShip] = useState();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [indexArr, setIndexArr] = useState<number>(0);
  const [carts, setCarts] = useState({ quantity: null, id: null });
  const [isModalOpen, setModalOpen] = useState(false);
  const [showModalBill, setShowModalBill] = useState(false);
  const [isModalOpenVoucher, setModalOpenVoucher] = useState(false);
  const [isModalOpenVoucher2, setModalOpenVoucher2] = useState(false);
  const [chooseRadio, setChooseRadio] = useState<number>();
  const [selectedName, setSelectedName] = useState<string>("");
  const [percent, setPrecent] = useState<number>(0);
  const [percent2, setPrecent2] = useState<number>(0);
  const toggleModal = () => {
    setModalOpenVoucher(!isModalOpenVoucher);
  };
  const toggleModal2 = () => {
    setModalOpenVoucher2(!isModalOpenVoucher2);
  };

  const getListDetailCart = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getListDetailCart(Number(userPrf?.id)),
      });
      if (res.status) {
        const cartsData = res?.data.map((product: IDetailProductCart) => ({
          quantity: product.quantity,
          id: product.idProductDetail,
        }));

        setListProducts(res?.data);
        setCarts(cartsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        configApi
      );
      if (response.status) {
        setProvinces(response?.data?.data);
      }
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
      if (response.status) {
        setDistricts(response?.data?.data);
      }
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
      if (response.status) {
        setWards(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching wards:", error);
    } finally {
    }
  };
  function generateUUID() {
    var d = new Date().getTime();
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  const caculateFee = async () => {
    if (!!dataAddress && dataAddress.length > 0) {
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
        const newBill = {
          account: userPrf?.id,
          customerName: dataAddress[0].name,
          email: userPrf?.email,
          district: dataAddress[0]?.district,
          province: dataAddress[0]?.province,
          ward: dataAddress[0]?.ward,
          specificAddress: dataAddress[0]?.specificAddress,
          moneyShip: feeShip,
          moneyReduce: (10 / 100) * calculateTotalDone(listProducts),
          totalMoney: calculateTotalDone(listProducts),

          note: "",
          paymentMethod: method,
          carts: carts,
        };
        if (method === 0) {
          const response = await axios.post(
            baseUrl + "api/bill/create-bill-client",
            newBill
          );
          if (response.status) {
            toast.success("Đặt hàng thành công");
            removeAllCart();
            navigate(path.home);
            // clearCart();
          }
        } else if (method === 1) {
          const tempNewBill = { ...newBill, id: generateUUID() };
          localStorage.setItem("checkout", JSON.stringify(tempNewBill));
          try {
            const response = await axios.get(
              baseUrl +
                `api/vn-pay/payment?id=${tempNewBill.id}&total=${newBill.totalMoney}`
            );
            if (response.status) {
              window.location.href = response.data.data;
            }
          } catch (error) {
            console.error("Error making axios request:", error);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        removeAllCart();
      }
    }
  };

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
    caculateFee();
  }, [dataAddress]);
  useEffect(() => {
    fetchProvinces();
  }, []);
  useEffect(() => {
    if (dataAddress && dataAddress.length > 0) {
      const defaultAddressIndex = dataAddress.findIndex(
        (address) => address.defaultAddress
      );
      if (defaultAddressIndex !== -1) {
        const defaultAddress = dataAddress[defaultAddressIndex];
        setSelectedProvince(Number(defaultAddress.province));
        setSelectedDistrict(Number(defaultAddress.district));
        setSelectedWard(Number(defaultAddress.ward));
        setSpecificAddress(defaultAddress.specificAddress);
        setSelectedDefault(defaultAddress.defaultAddress);
        setSelectedName(defaultAddress?.name);
        // Log the index
        setChooseRadio(defaultAddressIndex);
      }
    }
  }, [dataAddress]);
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
    if (userPrf?.id) {
      getListDetailCart();
    }
  }, [userPrf?.id]);
  useEffect(() => {
    if (userPrf?.id) {
      loadAddress();
    }
  }, [userPrf?.id, isModalOpen]);
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
      <div className="w-[80%] h-full min-h-screen my-5 mx-auto">
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
          {!!dataAddress &&
          dataAddress.length > 0 &&
          selectedWard &&
          selectedDistrict &&
          selectedProvince ? (
            <div className="w-full m-4 ">
              <div className="flex items-end ">
                <img src={Images.iconAddressRed} alt="" className="w-[20px]" />
                <div className="flex items-center">
                  <span className="font-medium text-sm ml-2 text-red-600 mr-2">
                    Địa chỉ nhận hàng
                  </span>
                  {!!dataAddress && dataAddress.length > 0 && (
                    <button className="bg-red-500 flex items-center px-2 py-1 rounded-sm">
                      <img
                        src={Images.iconPlus}
                        className="w-[15px] h-auto object-contain"
                      />

                      <button
                        className="text-white text-xs "
                        onClick={() => setModalOpen(true)}
                      >
                        Thêm địa chỉ mới
                      </button>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <span className="text-sm font-semibold text-black ">
                  {selectedName}
                </span>
                <span className="text-sm font-normal text-black ">
                  {specificAddress},{wardName(wards, selectedWard)},
                  {districtName(districts, selectedDistrict)},
                  {provinceName(provinces, selectedProvince)}
                </span>
                {selectedDefault && (
                  <div className="border-red-500 px-1 text-xs  border-[1px] text-red-500 ">
                    Mặc định
                  </div>
                )}
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
                  <th scope="col" className="px-6 py-3 text-left">
                    Sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3 text-center ">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
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
                        <td className="px-6 py-4 text-center text-gray-600 font-medium ">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600 font-medium">
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
        <div className="w-full bg-white  mt-5 shadow-md p-4 rounded-sm ">
          <div className=" flex justify-between mb-4 items-center ">
            <div className="flex items-center gap-2 ">
              <img
                src={Images.iconVoucher}
                alt=""
                className="w-10 object-contain h-auto "
              />
              <span className="text-base font-normal text-red-500">
                Kho voucher
              </span>
            </div>
            {!!listProducts && !!percent && percent > 0 ? (
              <div className=" py-2 border border-solid px-2 border-red-500 rounded relative">
                <p className="flex-1 text-end font-semibold text-sm  ">
                  -
                  {formatCurrency(
                    (percent / 100) * calculateTotalDone(listProducts)
                  )}
                </p>
                <div
                  className="bg-red-600 rounded-full p-[1px] absolute -top-1 -right-1 cursor-pointer "
                  onClick={() => {
                    setPrecent(0);
                  }}
                >
                  <img
                    src={Images.iconClose2}
                    alt=""
                    className="  w-3 h-3 object-contain "
                  />
                </div>
              </div>
            ) : (
              <button
                className="text-sm font-medium text-red-500 px-4 border-[1px] border-red-500  mx-4 py-2 "
                onClick={toggleModal}
              >
                Chọn voucher
              </button>
            )}
          </div>
          <div className=" flex justify-between items-center">
            <div className="flex items-center gap-2 ">
              <img
                src={Images.iconVoucher}
                alt=""
                className="w-10 object-contain h-auto "
              />
              <span className="text-base font-normal text-red-500 ">
                Voucher của bạn
              </span>
            </div>

            {!!listProducts && !!percent2 && percent2 > 0 ? (
              <div className=" py-2 border border-solid px-2 border-red-500 rounded relative">
                <p className="flex-1 text-end font-semibold text-sm  ">
                  -
                  {formatCurrency(
                    (percent2 / 100) * calculateTotalDone(listProducts)
                  )}
                </p>
                <div
                  className="bg-red-600 rounded-full p-[1px] absolute -top-1 -right-1 cursor-pointer "
                  onClick={() => {
                    setPrecent2(0);
                    // setCodeVoucher("");
                  }}
                >
                  <img
                    src={Images.iconClose2}
                    alt=""
                    className="  w-3 h-3 object-contain "
                  />
                </div>
              </div>
            ) : (
              <button
                className="text-sm font-medium text-red-500 border-[1px] border-red-500 mx-4 py-2 px-4"
                onClick={toggleModal2}
              >
                Chọn voucher
              </button>
            )}
          </div>
        </div>

        <div className="w-full bg-white  mt-5 shadow-md  rounded-sm relative ">
          <div className=" flex justify-between p-4">
            <span>Phương thức thanh toán</span>
            <div className="flex items-center gap-6">
              <button
                className={`border-[1px] text-sm px-2 py-1 rounded flex items-center ${
                  method === 0 ? "border-red-500" : ""
                } `}
                onClick={() => setMethod(0)}
              >
                <img
                  src={Images.iconReceive}
                  alt=""
                  className="w-auto h-5 object-contain "
                />
                Thanh toán khi nhận hàng{" "}
              </button>
              <button
                className={`border-[1px]  text-sm px-2 py-1 rounded flex items-center ${
                  method === 1 ? "border-red-500" : ""
                } `}
                onClick={() => setMethod(1)}
              >
                <img
                  src={Images.logVNPay}
                  alt=""
                  className="w-10 h-auto object-contain "
                />
                Thay toán bằng vnpay{" "}
              </button>
            </div>
          </div>
          <div className="w-full h-[2px] border-b-[1px] border-dashed border-gray-400" />
          <div className="flex  justify-between  my-3">
            <div></div>
            <div className="w-[30%] flex items-center justify-between mx-5">
              <span className="text-gray-600  text-sm font-normal">
                Tổng tiền hàng{" "}
              </span>
              {!!listProducts && listProducts.length > 0 && (
                <span className="text-red-500  text-sm font-medium">
                  {formatCurrency(calculateTotalDone(listProducts))}
                </span>
              )}
            </div>
          </div>
          <div className="flex  justify-between my-3">
            <div></div>
            <div className="w-[30%] flex items-center justify-between mx-5">
              <span className="text-gray-600  text-sm font-normal">
                Phí vận chuyển
              </span>
              <span className="text-red-500  text-sm font-medium">
                {" "}
                {formatCurrency(feeShip ? feeShip : 0)}
              </span>
            </div>
          </div>
          <div className="flex  justify-between my-3">
            <div></div>

            <div className="w-[30%] flex items-center justify-between mx-5">
              <span className="text-gray-600  text-sm font-normal">
                Tổng voucher giảm giá
              </span>
              <span className="text-red-500  text-sm font-medium">
                {" "}
                -
                {(!!listProducts && percent > 0) ||
                (!!listProducts && percent2 > 0)
                  ? formatCurrency(
                      (percent / 100) * calculateTotalDone(listProducts) +
                        (percent2 / 100) * calculateTotalDone(listProducts)
                    )
                  : formatCurrency(0)}
              </span>
            </div>
          </div>
          <div className="flex  justify-between my-3">
            <div></div>
            <div className="w-[30%] flex items-center justify-between mx-5">
              <span className="text-gray-600  text-base font-medium">
                Tổng thanh toán
              </span>
              {!!feeShip && !!listProducts && (
                <span className="text-red-600  text-lg font-medium">
                  {formatCurrency(
                    calculateTotalDone(listProducts) +
                      Number(feeShip ? feeShip : 0) -
                      ((percent / 100) * calculateTotalDone(listProducts) +
                        (percent2 / 100) * calculateTotalDone(listProducts))
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="w-full h-[2px] border-b-[1px] border-dashed border-gray-400" />
          <div className="w-full py-5 flex items-center justify-between px-4">
            <span>
              Nhấn "Đặt Hàng" đồng nghĩa với việc bạn đồng ý với các điều khoản
              của BeeShoe
            </span>
            <button
              className="bg-red-600 text-white text-base font-medium px-10 py-2"
              onClick={() => {
                setShowModalBill(true);
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
          <div className="bg-white  ">
            <div className="border-b-[1px] border-b-gray-400 border-solid w-full p-2">
              <span>Địa Chỉ Của Tôi</span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {!!dataAddress &&
                dataAddress.length > 0 &&
                dataAddress.map((item, index) => {
                  return (
                    <ChangeAdr
                      item={item}
                      key={index}
                      setIndexArr={setIndexArr}
                      indexArr={index}
                      chooseRadio={chooseRadio}
                      setChooseRadio={setChooseRadio}
                    />
                  );
                })}
            </div>
            <div className="w-full flex items-center   justify-around mt-5">
              <button
                className="border-red-500 border-[1px] py-[2px] px-4 text-red-500  text-sm"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Hủy
              </button>

              <button
                className="bg-red-500 border-[1px] py-1 px-4 text-white text-sm "
                onClick={() => {
                  if (dataAddress) {
                    setSelectedDistrict(
                      Number(dataAddress[indexArr]?.district)
                    );
                    setSelectedProvince(
                      Number(dataAddress[indexArr]?.province)
                    );
                    setSelectedWard(Number(dataAddress[indexArr]?.ward));
                    setSpecificAddress(dataAddress[indexArr]?.specificAddress);
                    setSelectedDefault(dataAddress[indexArr]?.defaultAddress);
                    setSelectedName(dataAddress[indexArr]?.name);
                  }
                  setShowModal(false);
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </ModalComponent>
      )}
      <AddAddressModal
        selectedProvince={selectedProvince}
        selectedDistrict={selectedDistrict}
        selectedWard={selectedWard}
        setSelectedProvince={setSelectedProvince}
        setSelectedDistrict={setSelectedDistrict}
        setSelectedWard={setSelectedWard}
        wards={wards}
        districts={districts}
        provinces={provinces}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      {!!listProducts && (
        <ShowVoucher
          isOpen={isModalOpenVoucher}
          onClose={toggleModal}
          valueCheck={calculateTotalDone(listProducts)}
          setPrecent={setPrecent}
        />
      )}
      {!!listProducts && (
        <ShowVoucherWithMe
          userId={Number(userPrf?.id)}
          isOpen2={isModalOpenVoucher2}
          onClose2={toggleModal2}
          valueCheck={calculateTotalDone(listProducts)}
          setPrecent2={setPrecent2}
        />
      )}
      {showModalBill && (
        <ModalComponent
          check={true}
          isVisible={showModalBill}
          onClose={() => {
            setShowModalBill(false);
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
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center mx-10">
              Xác nhận đặt hàng ?
            </h3>

            <div className="w-full flex justify-around items-center  gap-5  ">
              <button
                onClick={() => {
                  setShowModalBill(false);
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
                  setShowModalBill(false);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
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
