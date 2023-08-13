import React, { useEffect, useState } from "react";
import BannerShow from "../../components/BannerShow";
import SliderHome from "../../components/sliderHome/SliderHome";
import Images from "../../static";
import "./styles.css";
import SliderListProduct from "../../components/SliderListProduct";
import TitleBrand from "../../components/TitleBrand";
import { useNavigate } from "react-router-dom";
import path from "../../constants/path";
import dataProduct from "../../constants/data";
import SliderListBrand from "../../components/SliderListBrand";

const HomePage = () => {
  const [showBanner, setShowBanner] = React.useState<boolean>(true);
  const [activeTab, setActiveTab] = React.useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const handleShow = () => {
    setShowBanner(false);
  };
  const Line = () => {
    return (
      <span className="border-t-2 border-[#ebebeb] border-solid w-full h-[1px] my-3" />
    );
  };
  const Tab01 = () => {
    return (
      <div className="mt-9">
        <div className="w-full grid grid-cols-2 gap-2  mt-2">
          {dataProduct.map((item, index) => {
            return (
              <div
                className="w-[85%] bg-teal-300 mx-auto my-8 p-6 rounded-xl shadow-xl  relative pl-60"
                key={index}
              >
                <div className="absolute -left-[15%] h-full  top-0  flex items-center object-cover">
                  <img
                    src={item.imageSrc}
                    className="w-[300px] h-[220px] rounded-xl scale-75 hover:scale-95 ease-in duration-500"
                  />
                </div>
                <h1 className="text-xl  font-black text-slate-900">
                  {item.name}
                </h1>
                <span className="text-xl mt-2 mr-1 inline-block font-medium">
                  3,990,000 đ
                </span>
                <span className="text-xl mt-2 ml-1 inline-block font-thin line-through text-[#fff]">
                  3,990,000 đ
                </span>
                <div className="flex gap-5 mt-4">
                  <button
                    className="bg-slate-900 text-xs text-white px-2 py-2  rounded-md font-black hover:scale-105 ease-out duration-500"
                    onClick={() => {
                      navigate(path.product, { state: item });
                    }}
                  >
                    Mua Ngay
                  </button>
                  <button className="text-slate-900 text-xs bg-white px-3 py-2  rounded-md font-black hover:scale-105 ease-out duration-500 ">
                    Thêm Vào Giỏ Hàng
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const ShowModalHome = () => {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg">
          {/* Nội dung banner quảng cáo ở đây */}
          <h2 className="text-xl font-bold mb-4">
            Đây là banner sẽ quảng cáo{" "}
          </h2>
          <p>Bạn hãy đợi 5 giây nhé...</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              // Đóng modal khi click vào nút đóng
              alert("Đóng modal");
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    );
  };
  useEffect(() => {
    // Tắt modal sau khi đóng
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
      }, 5000); // Hiển thị
    }
  }, [showModal]);
  return (
    <div className=" w-full flex flex-col flex-1 bg-white no-scrollbar overflow-x-hidden ">
      {!!showBanner && <BannerShow handleShow={handleShow} />}
      {showModal && <ShowModalHome />}

      {}
      <SliderHome />
      {/* Thông tin ưu đãi */}
      <Line />
      <div className="w-full px-5 flex justify-between  ">
        <div className="flex items-center">
          <img src={Images.iconExChange} className="w-8 h-8 object-contain" />
          <span className="text-base text-black ml-2">
            Đổi mẫu, đổi size miễn phí
          </span>
        </div>
        <div className="flex items-center">
          <img src={Images.iconMoney} className="w-8 h-8 object-contain" />
          <span className="text-base text-black ml-2">
            Mua trước, trả sau miễn lãi
          </span>
        </div>
        <div className="flex items-center">
          <img src={Images.iconDivery} className="w-8 h-8 object-contain" />
          <span className="text-base text-black ml-2">
            Giao hàng, đổi trả tận nhà
          </span>
        </div>
        <div className="flex items-center">
          <img src={Images.iconX2Money} className="w-8 h-8 object-contain" />
          <span className="text-base text-black ml-2">
            Hàng giả, đền tiền gấp đôi
          </span>
        </div>
      </div>
      <Line />
      {/* Một số hãng giày nổi bật */}
      <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4 mx-auto  h-[515px]">
        <div className="row-span-3 relative ">
          <img
            src={Images.bannerAdidas}
            className="w-[455px] h-[515px] object-cover rounded-xl"
          />
          <button
            type="button"
            className=" absolute bottom-[8%] left-[50%] -translate-x-1/2  text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Giày Adidas
          </button>
        </div>
        <div className=" h-[515px] flex flex-col justify-between">
          <div className="col-span-2  relative">
            <img
              src={Images.bannerNike}
              className="w-[455px] h-[249px] object-cover rounded-xl"
            />
            <button className="absolute  bottom-[10%] left-[50%] -translate-x-1/2  inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span className=" px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Purple to pink
              </span>
            </button>
          </div>
          <div className=" col-span-2  relative">
            <img
              src={Images.bannerNike}
              className="w-[455px] h-[249px] object-cover rounded-xl"
            />
            <button className="absolute  bottom-[10%] left-[50%] -translate-x-1/2  inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span className=" px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Purple to pink
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Sản phẩm mới */}

      <p className=" text-2xl font-bold text-center uppercase mt-10 ">
        Danh sách thương hiệu
      </p>
      <Line />
      {/* Danh sách  thương hiệu  */}
      <SliderListBrand />
      {/* sản phẩm bán chạy */}
      <p className=" text-2xl font-bold text-center uppercase mt-10 ">
        SẢN PHẨM NỔI BẬT
      </p>
      <Line />

      <span className="text-[#999] italic  text-sm font-semibold text-center uppercase mb-5">
        Khuyến mại cuối tuần
      </span>
      <div className="w-full p-4 ">
        <div className="flex space-x-10 w-full justify-center">
          {/* Tab buttons */}
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 0
                ? "text-[#333]  font-bold text-base border-2 rounded-2xl border-[#f11a28] border-solid"
                : "text-[#333]  font-bold text-base  "
            }`}
            onClick={() => handleTabClick(0)}
          >
            Nike Jordan
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 1
                ? "text-[#333]  font-bold text-base border-2 rounded-2xl border-[#f11a28] border-solid"
                : "text-[#333]  font-bold text-base  "
            }`}
            onClick={() => handleTabClick(1)}
          >
            Nike Low
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 2
                ? "text-[#333]  font-bold text-base border-2 rounded-2xl border-[#f11a28] border-solid"
                : "text-[#333]  font-bold text-base  "
            }`}
            onClick={() => handleTabClick(2)}
          >
            Convert 14
          </button>
        </div>

        {/* Tab contents */}
        <div className="w-full">
          {activeTab === 0 && <Tab01 />}
          {activeTab === 1 && <Tab01 />}
          {activeTab === 2 && <Tab01 />}
        </div>
      </div>
      <SliderListProduct />
      {/* Danh mục sản phẩm giày adidas */}
      {Array(1)
        .fill(0)
        .map((_, i) => {
          return (
            <div key={i}>
              <TitleBrand
                title="Giày Adidas"
                subtitle="giày thương hiệu nổi bật"
              />

              <div className="grid grid-cols-4 gap-4 mx-auto mt-8 px-2">
                {Array(10)
                  .fill(0)
                  .map((_, i) => {
                    return (
                      <div className="w-64 h-fit group mx-auto" key={i}>
                        <div className="relative overflow-hidden">
                          <img
                            className="h-64 w-full object-cover"
                            src={Images.giay03}
                          />
                          <div className="absolute h-full w-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-col">
                            <button
                              className="bg-black text-white w-full mb-2 py-2 "
                              onClick={() => navigate(path.cart)}
                            >
                              Thêm vào giỏ hàng
                            </button>
                            <button
                              className="bg-black text-white  w-full py-2"
                              onClick={() => navigate("/product")}
                            >
                              Mua ngay
                            </button>
                          </div>
                        </div>
                        <h2 className="mt-3 text-sm text-[#000] capitalize font-semibold">
                          Giày Nike Air Force 1 Low Shadow Sunset Pulse (W)
                        </h2>
                        <span className="text-xl mt-2 mr-1 inline-block font-medium">
                          3,990,000 đ
                        </span>
                        <span className="text-xl mt-2 ml-1 inline-block font-thin line-through text-[#ccc]">
                          3,990,000 đ
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      {/* Tin tức nổi bật */}
      <div className="bg-[#f4f4f4] w-full pt-5 mt-3">
        <p className=" text-3xl font-bold text-center uppercase mt-5">
          ------- Tin tức nổi bật -------
        </p>
        <p className="text-[#999] italic  text-sm font-semibold text-center uppercase ">
          Tin tức mới nhất và thú vị nhất
        </p>

        <div className="flex justify-center items-center">
          <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 w-96 sm:w-auto">
            <div className="lg:flex items-stretch ">
              <div className="lg:w-1/2">
                <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
                  <div className="sm:w-1/2 relative">
                    <div>
                      <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        12 April 2021
                      </p>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h2 className="text-xl font-semibold 5 text-white line-clamp-2">
                          NIKE ADAPT BB – ĐÔI GIÀY CÔNG NGHỆ ĐẾN TỪ TƯƠNG LAI
                        </h2>
                        <p className="text-base leading-4 text-white mt-2 line-clamp-2">
                          Nike luôn khẳng định được vị thế của mình trong làng
                          thời trang giày khi liên tục đưa ra những mẫu giày
                          thời trang độc đáo cũng như những mẫu giày công nghệ
                          cực đỉnh. Mới đây nhất chính là mẫu Nike Adapt BB với
                          công nghệ tự thắt dây mới.
                        </p>
                        <a
                          href="#"
                          className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                        >
                          <p className="pr-2 text-sm font-medium leading-none">
                            Read More
                          </p>
                          <svg
                            className="fill-stroke"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.75 12.5L10.25 8L5.75 3.5"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <img
                      src={Images.banner05}
                      className="w-full h-[257px] object-cover"
                      alt="chair"
                    />
                  </div>
                  <div className="sm:w-1/2 sm:mt-0 mt-4 relative">
                    <div>
                      <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        12 April 2021
                      </p>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h2 className="text-xl font-semibold 5 text-white  line-clamp-2">
                          GIẢI MÃ SỨC HÚT CỦA ĐÔI GIÀY CỔ ĐIỂN ADIDAS
                        </h2>
                        <p className="text-base leading-4 text-white mt-2  line-clamp-2">
                          Dạo gần đây, Adidas cho ra mắt mẫu giày Adidas
                          Supercourt kết hợp với
                        </p>
                        <a
                          href="#"
                          className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                        >
                          <p className="pr-2 text-sm font-medium leading-none">
                            Read More
                          </p>
                          <svg
                            className="fill-stroke"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.75 12.5L10.25 8L5.75 3.5"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <img
                      src={Images.banner03}
                      className="w-full object-cover h-[257px]"
                      alt="wall design"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div>
                    <p className="md:p-10 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                      12 April 2021
                    </p>
                    <div className="absolute bottom-0 left-0 md:p-10 p-6">
                      <h2 className="text-xl font-semibold 5 text-white ">
                        NHỮNG LẦM TƯỞNG MÀ HẦU HẾT NGƯỜI VIỆT
                      </h2>
                      <p className="text-base leading-4 text-white mt-2">
                        Dive into minimalism
                      </p>
                      <a
                        href="#"
                        className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                      >
                        <p className="pr-2 text-sm font-medium leading-none">
                          Read More
                        </p>
                        <svg
                          className="fill-stroke"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.75 12.5L10.25 8L5.75 3.5"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <img
                    src={Images.banner04}
                    alt="sitting place"
                    className="w-full mt-8 md:mt-6 hidden sm:block  h-[466.44px] object-cover"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between">
                <div className="relative">
                  <div>
                    <p className="md:p-10 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                      12 April 2021
                    </p>
                    <div className="absolute bottom-0 left-0 md:p-10 p-6">
                      <h2 className="text-xl font-semibold 5 text-white">
                        The Decorated Ways
                      </h2>
                      <p className="text-base leading-4 text-white mt-2">
                        Dive into minimalism
                      </p>
                      <a
                        href="#"
                        className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                      >
                        <p className="pr-2 text-sm font-medium leading-none">
                          Read More
                        </p>
                        <svg
                          className="fill-stroke"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.75 12.5L10.25 8L5.75 3.5"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <img
                    src={Images.bannerAdidas}
                    alt="sitting place"
                    className="w-full sm:block hidden h-[466.44px] object-cover"
                  />
                </div>
                <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6 md:mt-6 mt-4">
                  <div className="relative w-full">
                    <div>
                      <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        12 April 2021
                      </p>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h2 className="text-xl font-semibold 5 text-white">
                          The Decorated Ways
                        </h2>
                        <p className="text-base leading-4 text-white mt-2">
                          Dive into minimalism
                        </p>
                        <a
                          href="#"
                          className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                        >
                          <p className="pr-2 text-sm font-medium leading-none">
                            Read More
                          </p>
                          <svg
                            className="fill-stroke"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.75 12.5L10.25 8L5.75 3.5"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <img
                      src="https://i.ibb.co/3yvZBpm/img-5.png"
                      className="w-full h-[257px] object-cover"
                      alt="chair"
                    />
                  </div>
                  <div className="relative w-full sm:mt-0 mt-4">
                    <div>
                      <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        12 April 2021
                      </p>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h2 className="text-xl font-semibold 5 text-white">
                          The Decorated Ways
                        </h2>
                        <p className="text-base leading-4 text-white mt-2">
                          Dive into minimalism
                        </p>
                        <a
                          href="#"
                          className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
                        >
                          <p className="pr-2 text-sm font-medium leading-none">
                            Read More
                          </p>
                          <svg
                            className="fill-stroke"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.75 12.5L10.25 8L5.75 3.5"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <img
                      src="https://i.ibb.co/gDdnJb5/img-6.png"
                      className="w-full h-[257px] object-cover"
                      alt="wall design"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Responsive /> */}
      {/* <ProductItem /> */}
    </div>
  );
};

export default HomePage;
