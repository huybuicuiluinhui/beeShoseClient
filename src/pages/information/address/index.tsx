import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import path from "../../../constants/path";
import Images from "../../../static";
import axios from "axios";
import API from "../../../api";
import {
  District,
  IAddress,
  Province,
  Ward,
} from "../../../types/product.type";
import AddAddressModal from "./modalAddAdr";
import { toast } from "react-toastify";
import UpdateAdr from "./updateAdr";
import { useShoppingCart } from "../../../context/shoppingCart.context";

const Address = () => {
  const { userPrf } = useShoppingCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [dataAddress, setDataAddress] = useState<IAddress[]>();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>();
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number>();
  const [wards, setWards] = useState<Ward[]>([]);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  const [itemProp, setItemProp] = useState<any>();
  const [selectedWard, setSelectedWard] = useState<number>();
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
  const deleteAdrID = async (id: number | string) => {
    try {
      const res = await axios({
        method: "delete",
        url: API.deleteAdr(Number(id)),
      });
      if (res.data) {
        toast.success("Đã xóa thành công");
        loadAddress();
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
        loadAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateItemProp = (newItemProp: IAddress) => {
    setItemProp(newItemProp);
  };

  useEffect(() => {
    if (userPrf) {
      loadAddress();
    }
  }, [userPrf?.id, isModalOpen, showUpdate]);

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

  return (
    <div className="w-full h-full pt-4">
      <div className="w-[80%] mx-auto">
        <div className="flex justify-between items-center p-4  border-[1px] border-gray-200">
          <p className="font-semibold text-gray-800  ">Địa chỉ của tôi</p>
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
        </div>
        {!!dataAddress &&
          dataAddress.length > 0 &&
          dataAddress.map((item, index) => {
            const nameProvince = provinces.find(
              (d) => d.ProvinceID === Number(item.province)
            );
            const nameDistrict = districts.find(
              (d) => d.DistrictID === Number(item.district)
            );
            const nameWard = wards.find(
              (d) => Number(d.WardCode) === Number(item.ward)
            );
            console.log(item);
            return (
              <div
                className="border-b-[1px] border-gray-200 flex p-2 "
                key={index}
              >
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
                    {item.specificAddress},{" "}
                    {nameWard ? nameWard.WardName : "ko được "}
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
                        setShowUpdate(true);
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
              </div>
            );
          })}
      </div>
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
      <UpdateAdr
        selectedProvince={selectedProvince}
        selectedDistrict={selectedDistrict}
        selectedWard={selectedWard}
        setSelectedProvince={setSelectedProvince}
        setSelectedDistrict={setSelectedDistrict}
        setSelectedWard={setSelectedWard}
        item={itemProp}
        isOpen={showUpdate}
        onClose={() => setShowUpdate(false)}
        provinces={provinces}
        districts={districts}
        wards={wards}
      />
    </div>
  );
};

export default Address;
