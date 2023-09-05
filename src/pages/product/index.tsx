import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductItem from "../../components/ProductItem";
import Rate from "../../components/Rate";
import { RateParamType } from "../../types/Rate.type";
import SliderListProduct from "../../components/SliderListProduct";
const ProductPage = () => {
  const location = useLocation();
  console.log("sdf", location.state);
  const [activeTab, setActiveTab] = React.useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const [rating, setRating] = useState(0);
  const [rating2, setRating2] = useState(0);

  const Tab01 = () => {
    return (
      <div className="w-[70%] mx-auto ">
        <p className="font-bold text-[#FFBA00]">
          Túi MLB Monogram Jacquard Hobo Bag New York Yankees
        </p>
        <p>
          MLB Monogram Jacquard Mini Cross Bag New York Yankees – nhỏ nhưng có
          võ. Đây là chiếc túi chéo mini rất đa dụng khi vừa có thể mang hàng
          ngày lẫn những chuyến đi chơi xa. Túi được làm từ polyester cao cấp,
          các chi tiết được gia công tỉ mỉ cùng khóa kéo chắc chắn và quai đeo
          dễ dàng tùy chỉnh. Túi có rất nhiều phối màu để bạn lựa chọn, đặc biệt
          phiên bản “hắc hường” rất phù hợp với những cô nàng năng động, cá
          tính.
        </p>
        <p>*Thông tin sản phẩm: Thương hiệu: MLB</p>
      </div>
    );
  };
  const Tab02 = () => {
    return (
      <div className="w-[70%] mx-auto">
        <p className="font-bold">
          Mời bạn đánh giá hoặc đặt câu hỏi về Túi MLB Monogram Jacquard Bag New
          York Yankees
        </p>
        <div className="grid grid-cols-3  ">
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
            <p>Đăng nhập để đánh giá</p>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-full  px-4">
      <ProductItem
      // product={location.state}
      />
      {/* Mô tả và đánh giá */}
      <div className="w-full p-4 mb-32">
        <div className="flex space-x-10 w-full justify-center">
          {/* Tab buttons */}
          <button
            className={` py-2 rounded-md font-bold px-9 ${
              activeTab === 0
                ? "text-[#fff]  text-base border-2 rounded-2xl   bg-[#FFBA00]"
                : "text-[#FFBA00]   text-base bg-[#ececec] "
            }`}
            onClick={() => handleTabClick(0)}
          >
            MÔ TẢ
          </button>
          <button
            className={`px-9 py-2 rounded-md font-bold text-base ${
              activeTab === 1
                ? "text-[#fff]    border-2 rounded-2xl bg-[#FFBA00]"
                : "text-[#FFBA00]    bg-[#ececec]  "
            }`}
            onClick={() => handleTabClick(1)}
          >
            ĐÁNH GIÁ
          </button>
        </div>
        <div className="w-full">
          {activeTab === 0 && <Tab01 />}
          {activeTab === 1 && <Tab02 />}
        </div>
        <p className="text-base font-thin  uppercase my-5 text-[#FFBA00]">
          Sản phẩm tương tự
        </p>
        <SliderListProduct />
      </div>
      {/* các sản phẩm tương tự */}
    </div>
  );
};

export default ProductPage;
