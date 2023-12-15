import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Images from "../../static";
import axios from "axios";
import API from "../../api";
import { IVoucher } from "../../types/product.type";
import { formartDate } from "../../utils/formatCurrency";
import { convertToCurrencyString } from "../../utils/format";
import { toast } from "react-toastify";
const ShowVoucherList = ({
  valueCheck,
  setPrecent,
}: {
  valueCheck: number;
  setPrecent: any;
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  const [dataVoucher, setDataVoucher] = useState<IVoucher[]>();
  const [inputVoucher, setInputVoucher] = useState<string>();
  const getVoucherSearch = async () => {
    const res = await axios({
      method: "get",
      url: API.getVoucherSearch(inputVoucher ? inputVoucher : ""),
    });
    if (res.status) {
      if (res?.data?.data.length === 1) {
        if (valueCheck >= res?.data?.data[0].minBillValue) {
          console.log(res.data?.data[0]);
          setPrecent(res?.data?.data[0]?.percentReduce);
          toast.success("Áp dụng voucher thành công");
        } else {
          toast.warning("Voucher không được áp dụng");
        }
      } else {
        toast.warning("Không tìm thấy mã");
      }
    }
  };
  const getAllVoucher = async () => {
    const res = await axios({
      method: "get",
      url: API.getVoucherPublic(),
    });
    if (res.status) {
      setDataVoucher(res?.data?.data);
    }
  };
  const handleChangeInput = (event: any) => {
    setInputVoucher(event?.target?.value);
  };
  useEffect(() => {
    getAllVoucher();
  }, []);

  return (
    <div className="">
      <div className="flex items-center gap-5 mx-4 mb-4">
        <input
          onChange={handleChangeInput}
          value={inputVoucher}
          type="text"
          placeholder="Nhập mã voucher tại đây"
          className="text-sm font-semibold py-2 border-gray-300 rounded-[5px] w-[75%]"
        />
        <div
          className="border-[1px] border-gray-400 px-4 py-1 rounded-[5px]"
          onClick={() => {
            getVoucherSearch();
          }}
        >
          <span className="font-medium">Áp dụng</span>
        </div>
      </div>
      <Slider {...settings}>
        {!!dataVoucher &&
          dataVoucher.length > 0 &&
          dataVoucher.map((item, index) => {
            return (
              <div
                key={index}
                className=" cursor-pointer"
                onClick={() => {
                  if (valueCheck >= item?.minBillValue) {
                    setPrecent(item?.percentReduce);
                    toast.success("Áp dụng voucher thành công");
                  } else {
                    toast.warning("Voucher không được áp dụng");
                  }
                }}
              >
                <div className="w-[250px] h-[88px] absolute flex items-center ">
                  <img src={Images.iconGift} alt="" className="w-6 ml-4 mr-2" />
                  <div className="border-l-2 border-dashed  h-[92%] p-1">
                    <p className="text-[10px] font-semibold text-blue-600">
                      Nhập mã{" "}
                      <span className="bg-blue-600 px-1 rounded text-white">
                        {item?.code}
                      </span>
                    </p>
                    <p className="font-semibold">Giảm {item?.percentReduce}%</p>
                    <p className="text-[10px] font-normal">
                      Cho đơn hàng từ:{" "}
                      {convertToCurrencyString(item?.minBillValue)}
                    </p>
                    <p className="text-[8px] text-blue-600">
                      Thời gian áp dụng từ: {formartDate(item?.startDate)}
                    </p>
                  </div>
                </div>
                <img
                  src={Images.bgItemVoucher}
                  className="w-[250px] h-[88px]  "
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default ShowVoucherList;
