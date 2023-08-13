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
        <p className="font-bold">
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
            <p className="text-[#de0c19] font-bold text-4xl text-center my-3">
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
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <a
                href="#"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Projects
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                Flowbite
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <ProductItem
      // product={location.state}
      />
      {/* Mô tả và đánh giá */}
      <div className="w-full p-4 ">
        <div className="flex space-x-10 w-full justify-center">
          {/* Tab buttons */}
          <button
            className={` py-2 rounded-md font-bold px-9 ${
              activeTab === 0
                ? "text-[#fff]  text-base border-2 rounded-2xl   bg-[#de0c19]"
                : "text-[#de0c19]   text-base bg-[#ececec] "
            }`}
            onClick={() => handleTabClick(0)}
          >
            MÔ TẢ
          </button>
          <button
            className={`px-9 py-2 rounded-md font-bold text-base ${
              activeTab === 1
                ? "text-[#fff]    border-2 rounded-2xl bg-[#de0c19]"
                : "text-[#de0c19]    bg-[#ececec]  "
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
        <p className="text-3xl font-bold text-center uppercase my-5">
          ------- Có thể bạn quan tâm -------
        </p>
        <SliderListProduct />
      </div>
      {/* các sản phẩm tương tự */}
    </div>
  );
};

export default ProductPage;
