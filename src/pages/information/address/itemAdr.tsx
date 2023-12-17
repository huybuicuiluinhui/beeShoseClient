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
import { getTokenCustomer } from "../../../helper/useCookie";
import ModalComponent from "../../../components/Modal";
import DetailAddress from "./detailAddress";

const ItemAdr = ({
  item,
  check,
  setCheck,
  checkUp,
  setCheckUp,
}: {
  item: IAddress;
  check: boolean;
  setCheck: any;
  checkUp: boolean;
  setCheckUp: any;
}) => {
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const itemRef = useRef<IAddress | null>(null);
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
        url: API.putAdr(item?.id),
        data: {
          name: item?.name,
          phoneNumber: item?.phoneNumber,
          specificAddress: item?.specificAddress,
          ward: item?.ward,
          district: item?.district,
          province: item?.province,
          defaultAddress: true,
        },
      });
      if (res.data) {
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
          <span className="text-[#000000de]  text-sm">
            {item?.name ? item?.name : ""}
          </span>
          <div className="h-full w-[0.5px] ml-2 bg-[#0000008a]" />
          <span className="text-[#0000008a] ml-2 text-sm">
            {item?.phoneNumber ? item?.phoneNumber : ""}
          </span>
        </div>
        <DetailAddress
          spec={item?.specificAddress}
          distr={item?.district}
          prov={item?.province}
          war={item?.ward}
        />

        {item?.defaultAddress && (
          <button className="px-2  mt-2 border-red-400 border-[1px] w-fit text-red-500 text-sm">
            Mặc định
          </button>
        )}
      </div>
      <div className="w-[20%] flex flex-col h-full justify-between items-center">
        <div className="flex items-center justify-around w-full">
          <button
            className="text-sm text-blue-400"
            onClick={() => {
              updateItemProp(item);
            }}
          >
            Cập nhật
          </button>
          {item?.defaultAddress === true ? (
            <></>
          ) : (
            <button
              className="text-sm text-blue-400"
              onClick={() => {
                setShowModalDelete(true);
              }}
            >
              Xóa
            </button>
          )}
        </div>
        {item?.defaultAddress === true ? (
          <></>
        ) : (
          <button className="border-[#d8d8d8] border-[1px] h-fit px-2 rounded mt-2 ">
            <span
              className="text-[#000000de] text-sm "
              onClick={() => {
                updateStatus(item);
              }}
            >
              Thiết lập mặc định
            </span>
          </button>
        )}
      </div>
      <UpdateAdr
        checkUp={checkUp}
        setCheckUp={setCheckUp}
        item={itemRef.current}
        isOpen={showUpdate}
        onClose={() => setShowUpdate(false)}
      />
      {showModalDelete && (
        <ModalComponent
          check={true}
          isVisible={showModalDelete}
          onClose={() => {
            setShowModalDelete(false);
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
              Xác nhận xóa địa chỉ mà bạn đã lựa chọn ?
            </h3>

            <div className="w-full flex justify-around items-center mb-2">
              <button
                onClick={() => {
                  setShowModalDelete(false);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-green-400  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 "
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  deleteAdrID(item?.id);
                  setShowModalDelete(false);
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

export default ItemAdr;
