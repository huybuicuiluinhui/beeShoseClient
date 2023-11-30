import React, { useState, useEffect } from "react";
import {
  District,
  IAddress,
  Province,
  Ward,
} from "../../../types/product.type";
import axios from "axios";
import API from "../../../api";
import { toast } from "react-toastify";

const UpdateAdr = ({
  item,
  isOpen,
  onClose,
  selectedProvince,
  selectedDistrict,
  selectedWard,
  setSelectedDistrict,
  setSelectedProvince,
  setSelectedWard,
  provinces,
  districts,
  wards,
}: {
  item: IAddress;
  isOpen: boolean;
  onClose: any;
  provinces: Province[];
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;
  districts: District[];
  setSelectedDistrict: any;
  setSelectedWard: any;
  setSelectedProvince: any;
  wards: Ward[];
}) => {
  const [checkDefault, setCheckDefault] = useState<boolean>();
  const [user, setUser] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [specificAddress, setSpecificAddress] = useState<number | string>("");
  const configApi = {
    headers: {
      Token: "aef361b5-f26a-11ed-bc91-ba0234fcde32",
      "Content-Type": "application/json",
      ShopId: 124173,
    },
  };

  useEffect(() => {
    if (!!item) {
      setUser(item?.name);
      setPhoneNumber(item?.phoneNumber);
      setSpecificAddress(item?.specificAddress);
      setCheckDefault(item?.defaultAddress);
    }
  }, [item]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  if (!isOpen) return null;

  const updateAdress = async () => {
    try {
      const res = await axios({
        method: "put",
        url: API.putAdr(item?.id),
        data: {
          name: user,
          phoneNumber: phoneNumber,
          specificAddress: specificAddress,
          ward: selectedWard,
          district: selectedDistrict,
          province: selectedProvince,
          defaultAddress: checkDefault,
        },
      });
      if (res.data) {
        toast.success("Đã thay đổi địa chỉ thành công");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[100]">
      <div className="relative top-20 mx-auto p-5 border w-[50%] shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Cập nhật địa chỉ
          </h3>
          <div className="mt-2 px-7 py-3">
            <div className="flex justify-between w-full px-4 my-5">
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">Nhập họ và tên</span>
                <input
                  value={user}
                  onChange={(e) => {
                    setUser(e?.target?.value);
                  }}
                  autoComplete="off"
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                />
              </div>
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">
                  Nhập số điện thoại
                </span>
                <input
                  autoComplete="off"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e?.target?.value);
                  }}
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                />
              </div>
            </div>
            <div className="flex justify-between w-full px-4 my-3">
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">
                  Nhập Tỉnh/Thành Phố
                </span>
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
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">Nhập Quận/Huyện</span>
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
            </div>

            <div className="flex justify-between w-full px-4 my-5">
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">Nhập Phường/Xã</span>
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
              <div className="relative z-0  w-[45%]  flex flex-col items-start">
                <span className="text-xs text-gray-700 ">
                  Nhập địa chỉ cụ thể
                </span>
                <input
                  value={specificAddress}
                  onChange={(e: any) => setSpecificAddress(e?.target?.value)}
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                />
              </div>
            </div>
            <div className="flex items-center mb-2 px-4 ">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={checkDefault}
                onChange={(e) => setCheckDefault(e.target.checked)}
                className="w-4 h-4 text-gray-600 bg-gray-100 rounded  "
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Đặt làm địa chỉ mặc định
              </label>
            </div>
          </div>
          <div className=" px-4 py-3 flex items-center justify-around">
            <button
              className="px-8 py-1 border-[1px]  border-[#f5f5f5]  text-sm font-medium rounded-md  shadow-sm bg-[#f5f5f5] hover:bg-[#c1bdbd] focus:outline-none "
              onClick={onClose}
            >
              Trở lại
            </button>
            <button
              className="px-4 py-1 bg-red-500 text-white text-base font-medium rounded-md  shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => {
                updateAdress();
              }}
            >
              Hoàn thành
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateAdr;
