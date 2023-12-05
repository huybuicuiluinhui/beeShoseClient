import React, { useState, useEffect } from "react";
import { District, IAddress, Province, Ward } from "../../types/product.type";
import ModalComponent from "../../components/Modal";
import { configApi } from "../../utils/config";
import axios from "axios";

const ChangeAdr = ({
  item,
  indexArr,
  setIndexArr,
}: {
  item: IAddress;
  indexArr: any;
  setIndexArr: any;
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<boolean>(false);
  const [selectedWard, setSelectedWard] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleRadioChange = () => {
    setIsChecked(!isChecked);
    setIndexArr(indexArr);
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        configApi
      );

      setProvinces(response?.data?.data);
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setSelectedProvince(true);
    }
  };

  const fetchDistrictsByProvince = async (provinceId: number) => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
        configApi
      );
      setDistricts(response?.data?.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setSelectedDistrict(true);
    }
  };

  const fetchWardsByDistrict = async (districtId: number) => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
        configApi
      );
      setWards(response.data.data);
    } catch (error) {
      console.error("Error fetching wards:", error);
    } finally {
      setSelectedWard(true);
    }
  };

  useEffect(() => {
    if (!!item) {
      fetchProvinces();
      setIsChecked(item.defaultAddress);
    }
  }, [item]);

  useEffect(() => {
    if (selectedProvince === true) {
      fetchDistrictsByProvince(Number(item.province));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict === true) {
      fetchWardsByDistrict(Number(item.district));
    }
  }, [selectedDistrict]);

  const nameProvince = provinces.find(
    (d) => d.ProvinceID === Number(item.province)
  );

  const nameDistrict = districts.find(
    (d) => d.DistrictID === Number(item.district)
  );

  const nameWard = wards.find((d) => Number(d.WardCode) === Number(item.ward));

  return (
    <label
      className={`flex items-center  py-5 px-5
      border-b-[1px] border-dashed border-gray-500`}
    >
      <input
        onChange={handleRadioChange}
        checked={isChecked}
        id={`default-radio-${item?.id}`}
        type="radio"
        aria-describedby="helper-radio-text"
        name="default-radio"
        className="w-4 h-4 text-blue-600 bg-white border-gray-300 checked:bg-gray-600  focus:ring-0"
      />
      <div className="flex w-full justify-between ml-2">
        <div className="flex flex-col w-full  ">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              {" "}
              <span className="text-sm font-medium ">{item.name}</span>
              <div className="border-l-[1px] border-l-gray-400 ml-2 pl-2 text-xs text-gray-500">
                {item.phoneNumber}
              </div>
            </div>
          </div>
          <span className="text-gray-500 text-sm ">
            {item?.specificAddress},{nameWard ? nameWard.WardName : "ko được "},
            {nameDistrict ? nameDistrict.DistrictName : "không được"},{" "}
            {nameProvince ? nameProvince.ProvinceName : "không được"}
          </span>
          {!!item.defaultAddress && (
            <button className="border-red-500 px-1 text-xs  border-[1px] text-red-500 w-fit">
              Mặc định
            </button>
          )}
        </div>
      </div>
    </label>
  );
};

export default ChangeAdr;
