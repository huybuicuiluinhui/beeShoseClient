import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductItem from "../../components/ProductItem";
import Rate from "../../components/Rate";
import SliderListProduct from "../../components/SliderListProduct";
import axios from "axios";
import API from "../../api";
import { IDetailProduct, IInforShoe, IProduct } from "../../types/product.type";
const ProductPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState(0);
  const [inforShoe, setInforShoe] = useState<IInforShoe>();
  const [dataDetailProduct, setDataDetailProduct] =
    useState<IDetailProduct[]>();
  const [dataProductSole, setDataProductSole] = useState<IProduct[]>();
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const [rating, setRating] = useState(0);
  const [rating2, setRating2] = useState(0);
  const getInfoDetailProduct = async () => {
    const res = await axios({
      method: "get",
      url: API.getShoeDetail(location.state),
    });
    if (res.status) {
      setDataDetailProduct(res?.data?.data);
    }
  };

  const getShoeSole = async () => {
    const res = await axios({
      method: "get",
      url: API.getSoleChoose(location.state, 1, 20),
    });
    if (res.status) {
      setDataProductSole(res?.data?.data);
    }
  };
  const getProductWithId = async () => {
    const res = await axios({
      method: "get",
      url: API.getShoeWithId(location.state),
    });
    if (res.status) {
      setInforShoe(res.data);
    }
  };
  useEffect(() => {
    getProductWithId();
    getInfoDetailProduct();
    getShoeSole();
  }, [location.state]);
  console.log("ahihih", inforShoe);
  const Tab01 = () => {
    return (
      <div className="w-[70%] mx-auto ">
        <p className="font-semibold my-4">
          Mô tả sản phẩm:{" "}
          <span className="underline font-normal ">{inforShoe?.name}</span>{" "}
        </p>
        <span className="font-bold my-4">Thông tin sản phẩm: </span>
        <span className=" my-4 font-thin">{inforShoe?.description}</span>
        <p className="font-semibold my-4">
          Thương hiệu:{" "}
          <span className="font-thin ">{inforShoe?.brand.name}</span>
        </p>
        <p className="font-medium my-4">
          Danh mục:{" "}
          <span className="font-thin ">{inforShoe?.category.name}</span>
        </p>
      </div>
    );
  };
  const Tab02 = () => {
    return (
      <div className="w-[70%] mx-auto">
        <p className="font-normal">
          Chính sách trao đổi tại <span className="font-bold">BeeShoe</span>
        </p>
        <p className="text-red-600 font-semibold">
          <span className="underline">Lưu ý</span>: Trong thời gian khuyến mãi,
          thời gian giao hàng có thể lâu hơn dự kiến. Chúng tôi xin lỗi vì sự
          bất tiện này.
        </p>
        <p className="font-semibold">
          {" "}
          Sản phẩm áp dụng:{" "}
          <span className="font-normal">
            Tất cả sản phẩm được bán trên Website BeeShoe
          </span>
        </p>
        <span className="font-semibold"> Sản phẩm không áp dụng: </span>
        <p className="font-normal">Các sản phẩm tại cửa hàng BeeShoe,...</p>
        <p className="font-normal">
          Không áp dụng cho sản phẩm mua trực tiếp tại Supersports.
        </p>
        <p className="font-semibold">
          {" "}
          Thời gian đổi hàng:{" "}
          <span className="font-normal">
            Trong vòng 30 ngày (với sản phẩm nguyên giá) và 10 ngày (với sản
            phẩm giao ngay) kể từ ngày khách hàng nhận sản phẩm cho đến khi
            Supersports nhận lại sản phẩm (tính theo Postmark). Xem thêm thông
            tin tại CHÍNH SÁCH HOÀN TRẢ SẢN PHẨM
          </span>
        </p>
        {/* <div className="grid grid-cols-3  ">
          <div className="border p-4">
            <p className="text-xl font-normal text-center">
              Đánh giá trung bình
            </p>
            <p className="text-[#FFBA00] font-bold text-4xl text-center my-3">
              0/5
            </p>
            <Rate rating={rating} onRating={(rate: any) => setRating(rate)} />
          </div>
          <div className="border p-4 h-full flex flex-col justify-around">
            <p className="text-sm  text-center text-[#FE5335]">
              Đánh giá sản phẩm
            </p>
            <div className="my-3">
              <Rate
                rating={rating2}
                onRating={(rate: any) => setRating(rate)}
              />
            </div>
            <p className="text-sm  text-center text-[#FE5335]">
              Nội dung đánh giá
            </p>
            <textarea />
          </div>
          <div className="border p-4 ">
            <span>Đăng nhập để đánh giá</span>
          </div>
        </div> */}
      </div>
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-full  px-4">
      {!!inforShoe && !!dataDetailProduct && !!dataDetailProduct.length && (
        <ProductItem
          product={dataDetailProduct}
          shoeId={location.state}
          inforShoe={inforShoe}
        />
      )}
      <div className="w-full h-[1px] bg-gray-400" />
      {/* Mô tả và đánh giá */}
      <div className="w-full  mb-32 mt-2">
        <div className="flex space-x-10 w-full justify-center mb-10">
          {/* Tab buttons */}
          <button
            onClick={() => handleTabClick(0)}
            className={`px-4 ${
              activeTab === 0 ? " border-[#FFBA00] border-b-[1px]" : ""
            } py-2 px-4 relative group btn4 leading-none overflow-hidden`}
          >
            <span className=" rounded-md font-semibold px-9 text-gray-700">
              MÔ TẢ
            </span>
            <span
              className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#FFBA00]  `}
            />
          </button>
          <button
            onClick={() => handleTabClick(1)}
            className={`px-4 ${
              activeTab === 1 ? " border-[#FFBA00] border-b-[1px]" : ""
            } py-2 px-4 relative group btn4 leading-none overflow-hidden`}
          >
            <span className="rounded-md font-semibold px-9 text-gray-700">
              CHÍNH SÁCH HOÀN TRẢ
            </span>
            <span
              className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#FFBA00]  `}
            />
          </button>
        </div>
        <div className="w-full">
          {activeTab === 0 && <Tab01 />}
          {activeTab === 1 && <Tab02 />}
        </div>
        <p className="text-base font-thin  uppercase my-5 text-[#FFBA00] flex">
          Các sản phẩm tương tự
          <div className="w-10 h-[1px] bg-[#FFBA00] self-end ml-2" />
        </p>
        {!!dataProductSole && !!dataProductSole.length && (
          <SliderListProduct products={dataProductSole} />
        )}
      </div>
      {/* các sản phẩm tương tự */}
    </div>
  );
};

export default ProductPage;
