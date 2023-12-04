import React, { useState, useEffect, useRef } from "react";
import {
  District,
  IAddress,
  Province,
  Ward,
} from "../../../types/product.type";
import axios from "axios";
import UpdateAdr from "./updateAdr";
import { configApi } from "../../../utils/config";
import API from "../../../api";
import { toast } from "react-toastify";

const ItemAdr = ({
  item,
  check,
  setCheck,
}: {
  item: IAddress;
  check: boolean;
  setCheck: any;
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<boolean>(false);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<boolean>(false);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const itemRef = useRef<IAddress | null>(null);

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
  const deleteAdrID = async (id: number | string) => {
    try {
      const res = await axios({
        method: "delete",
        url: API.deleteAdr(Number(id)),
      });
      if (res.data) {
        toast.success("Đã xóa thành công");
        setCheck(!check);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (item: IAddress) => {
    try {
      const res = await axios({
        method: "put",
        url: API.putAdr(item.id),
        data: {
          name: item.name,
          phoneNumber: item.phoneNumber,
          specificAddress: item.specificAddress,
          ward: item.ward,
          district: item.district,
          province: item.province,
          defaultAddress: true,
        },
      });
      if (res.data) {
        toast.success("Đã sửa thành công");
        setCheck(!check);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateItemProp = (newItemProp: IAddress) => {
    itemRef.current = newItemProp;
    setShowUpdate(true);
  };
  return (
    <div className="border-b-[1px] border-gray-200 flex p-2 ">
      <div className="w-[80%] flex flex-col justify-between">
        <div className="flex items-center">
          <span className="text-[#000000de]  text-xs">
            {item.name ? item.name : "Chưa có tên"}
          </span>
          <div className="h-full w-[0.5px] ml-2 bg-[#0000008a]" />
          <span className="text-[#0000008a] ml-2 text-xs">
            {item?.phoneNumber ? item?.phoneNumber : "Chưa sđt"}
          </span>
        </div>
        <p className="text-[#0000008a]  text-xs">
          {" "}
          {item.specificAddress}, {nameWard ? nameWard.WardName : "ko được "}
        </p>
        <p className="text-[#0000008a]  text-xs">
          {nameDistrict ? nameDistrict.DistrictName : "không được"},{" "}
          {nameProvince ? nameProvince.ProvinceName : "không được"}
        </p>
        {item.defaultAddress && (
          <button className="px-2  mt-2 border-red-400 border-[1px] w-fit text-red-500 text-xs">
            Mặc định
          </button>
        )}
      </div>
      <div className="w-[20%] flex flex-col h-full justify-between items-center">
        <div className="flex items-center justify-around w-full">
          <button
            className="text-xs text-blue-400"
            onClick={() => {
              updateItemProp(item);
            }}
          >
            Cập nhật
          </button>
          <button
            className="text-xs text-blue-400"
            onClick={() => {
              deleteAdrID(item.id);
            }}
          >
            Xóa
          </button>
        </div>
        <button className="border-[#d8d8d8] border-[1px] h-fit px-2 rounded mt-2 ">
          <span
            className="text-[#000000de] text-xs"
            onClick={() => {
              updateStatus(item);
            }}
          >
            Thiết lập mặc định
          </span>
        </button>
      </div>
      <UpdateAdr
        item={itemRef.current}
        isOpen={showUpdate}
        onClose={() => setShowUpdate(false)}
      />
    </div>
  );
};

export default ItemAdr;
