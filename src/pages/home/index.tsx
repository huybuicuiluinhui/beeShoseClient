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
import axios from "axios";
import API from "../../api";
import { ProductType } from "../../types/product.type";
import ProductStanding from "../../components/ProductStanding";

const HomePage = () => {
  const [showBanner, setShowBanner] = React.useState<boolean>(true);
  const [activeTab, setActiveTab] = React.useState(0);
  const [showModal, setShowModal] = useState(false);
  const today = new Date();
  const dayIndex = today.getDay(); // Lấy chỉ số ngày trong tuần (0 - Chủ Nhật, 1 - Thứ Hai, ...)
  console.log(dayIndex);

  let promotionType = "";

  if (dayIndex === 1 || dayIndex === 2) {
    promotionType = "Khuyến mãi đầu tuần";
  } else if (dayIndex >= 3 && dayIndex <= 5) {
    promotionType = "Khuyến mãi giữa tuần";
  } else {
    promotionType = "Khuyến mãi cuối tuần";
  }

  const navigate = useNavigate();
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const handleShow = () => {
    setShowBanner(false);
  };
  const Line = () => {
    return (
      <span className="border-b-2 border-[#00ff8c] border-solid w-full h-[1px] my-3" />
    );
  };

  const getDataShoes = async () => {
    const res = await axios({
      method: "get",
      url: API.getShoesImg(),
    });
    if (res.status) {
      console.log("res.data", res.data);
    }
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
    // getDataShoes();
  }, []);

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
      <SliderHome />
      {/* Thông tin ưu đãi */}
      <Line />
      <div className="w-full px-5 flex justify-between  ">
        <div className="flex items-center">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA0klEQVR4nO2VsY5BQRhGT0ShWYlNFMpVehGleASJd1AoaL2FmmaLDea/Ept4BDUqlUQnyk9cbESW6t5RmJP8zWQmZ+YrvoFA4C3QiKKMoYymP6lRlWMjQ3J0fUl7sTDpcWw1pvRM3JCxvzm0k2OZwPzqm4/nr44oyzH3GvUVzcjKaCui9rcYCARehTpkZPQ1peJXPCN3KaGDjNbpIo83j8jH9ZZETRqru76easLn/+IxpbjQ0/gojLUcXymGfBf1eQb6oZC69KbvF3LUvQgDgZdzBEMQP1i1qaYaAAAAAElFTkSuQmCC" />{" "}
          <span className="text-base text-[#FFBA00] ml-2">
            Đổi mẫu, đổi size miễn phí
          </span>
        </div>
        <div className="flex items-center">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAACXBIWXMAAAsTAAALEwEAmpwYAAACeElEQVR4nO2WW4iNURTHfwwSMokHl1IelMgLD/LgEt5QeKGIhiKXQuKF8uKBPLiUWyThxRFJcs5anzouTZgmPLhEEaUYl4REqL/2nj3jnGlGzJkzT1at+tb+9rd/e6+9Lh/8l2qLjEUydlZdCywshT6UUy8nF9V4J6Oh1e6MGg1xnd9j9YHTFrqgxL4pp64i7zl1YZ0Se0GnoTL6y1knY7+MtbpIv6pCVWSIjCdy7so5IOdetDMGVw9qHJJzVjlqop2jRsY5GQe7HKoCY+Qck/FZzrSyxTOmp/FjYV6XQJVRK+O1nBPxLov0KoM20jvd8UkZr3SZgZVDnWlymvgLkfOmxROVQfMMk/NFzvoQSO3CQoA5G+K8IkMrhgZRgTkxYo3NtCMytsi4o4zZVcnTv5X/0LbudTlHkjbJuFpi/7ta/L6pZMzL7zRjabe0NmNJ6UnPyHgspzHpdRmZjLycUzL2yNgmY5UKzFOeCaFodBhEBZbL2Bifc/SJba3IgLaRNlPGmhRxy2SsTBpSYYecw3LOy7km44GMr3KU+uVtGUeVsVrGJBXpK2eXjOPJi7VxrjO8HBpyrPlFi35Mpe++jAsydsdTGjPiIqKHrjBCeabEUzn7ZNyQ80nONxlv4+nyjOsYGurnJQbJGKUrjJUxURmzwu+FnK2p7tanxX7GTRp7Zcwv7afaTs/oemeTHJPxXc6jdqH/InJGy1iRCvzL1GFOh2qUWt0hFVicXDs+ls/Q/or07TS0bAPhZMbU1Gffy3km43mIhbTBW2U/Y10twc0xGI2nMl7ImBszoTRNqgZv7q/BpR9k/OgWaCs8Y2SM/IzJ3Qb9k/wCfOx0NhkL26MAAAAASUVORK5CYII=" />{" "}
          <span className="text-base text-[#FFBA00] ml-2">
            Mua trước, trả sau miễn lãi
          </span>
        </div>
        <div className="flex items-center">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAACN0lEQVR4nO2WTYhNYRjHf74ajaTZyIIsfFvZWMlGiIWsyBglFjbKRpOsLKRENqxskIWvDY3p3vM8x7iFlLob3zaifC0oakIJf73nXrcz955z58yYuyBP/eve0/uc3/s+7/P874X/8deHjKN/oCOKWDc2oHN63DLOyPgiY0VxYMzaQqoyLadCtxXRVxxoPC+kQXpyKnRLxo7iwEF62qpEV9v8GrCcUe6TMtZnJaitjD2jAp1qqpE+yLhchw7L2d+JEzZKKuOJYjYkn2NWJlBjUzqhminjVDtQEWAIGTuTU0fMqz1wtmSqzGomABhCzlk5d1Rhavbg54zAuIEDdMt5KmNvJ4D35WxtWVcr7eNaSQfoLgooAOyvu0/zLL+W8702FkPMnyhgCEUsbXGqiL7A6ggwKwIjF6hrzJSzS86B0bq1paQluuT0yjgoY6PEpLZAxSyW8UbOPTmXZLwPrlEEKGN20o3OQxkX5LyScz2MQxr4Q0MsaLzAqMg43vheYU6ygbRb5AGdc3Iu6gpTGpUyHoRxUMTCwAqLbsp5JCNOFDZQYm7TS0/IedFYM1If6ycKuZ9lrBqRa+yT8U7OMzkeHsxQzPZg0nUNN/+gyjgv52pqTZ5eKmZz02YP1w2+N3P8gofKuBu8L5RGxra66y/Lu8dUbn9ykhssD80S/n7I+CRjTX5ShemJ9xk/ZXyV8zbv/lpyDzFZzjEZ35LcUO6I3UVyQ7fOkrPodwOMJRSuqcySsVjkvxO/ANn0ziVH+E5iAAAAAElFTkSuQmCC" />{" "}
          <span className="text-base text-[#FFBA00] ml-2">
            Giao hàng, đổi trả tận nhà
          </span>
        </div>
        <div className="flex items-center">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAABvUlEQVR4nO1WTSuFQRR+fETIQvIHhD/gKyksbF1LKb+AjVCyoggLVn6BpWsjXbd7ziyUYmdBSZQsLFlaUHg043Rzyb0v7yXKqdN75syZ55k575yZAf7lJ4QO7VSMUzFdUAUj2XGKYfOPe4xoZIpFCp6oYES9YxIVTKKMitus32MIFvKTZdBhgUdUJOjQX1AVza/GN5kvQcGxTbwt3+ombXYDEbOfDythWBMfBwnmQpBDX2xChz4jnPvbhEyj0m+YbydkGg1UpKl4sN25+pq4+ISKTSuBfQrO324QfpUwpGwb1dZf49tmX1NxGOwt1IZ6VOzFJxSkqLiioNO+KfN306HR7B6rue1iEI5Z6h4NYDT4D1BFwRoFN9bv/2VvfEKihIpTAz31bYtdMcALCtbp0JWDFWOFM0Z2bwAzwa+4tGPQpzwZNIOh+IQeSHBGh5bwVSQt9uTdQS7YiE84i1LuojzYuyj37aydQl2O8iXdsQi/KvydhPrT15NDu+28YzoM2iVbb331kS5kF3QwewELWvPPTLCQ88QQ7Jg/84lnBw1jPmo62qiYCu8bK+hwlAmWKFguqIqpgiv7FxRJngHWp6Pop0a7agAAAABJRU5ErkJggg==" />
          <span className="text-base text-[#FFBA00] ml-2">
            Hàng giả, đền tiền gấp đôi
          </span>
        </div>
      </div>

      <Line />
      {/* Danh sách  thương hiệu  */}

      <p className=" text-2xl font-bold text-center uppercase   text-[#FFBA00]">
        Danh sách thương hiệu
      </p>
      <SliderListBrand />
      {/* sản phẩm sale */}
      <p className=" text-2xl font-bold text-center uppercase   text-[#FFBA00]">
        Sản phẩm đang sale
      </p>
      <Line />
      <SliderListProduct />
      {/* sản phẩm bán chạy */}
      <Line />
      <p className=" text-2xl font-bold text-center uppercase  text-[#FFBA00] ">
        SẢN PHẨM NỔI BẬT
      </p>

      <span className="text-[#999] italic  text-sm font-semibold text-center uppercase mb-5">
        {promotionType}
      </span>
      <div className="w-full p-4 ">
        <div className="grid grid-cols-5 gap-0 ">
          {dataProduct.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  navigate(path.product);
                }}
              >
                <ProductStanding product={item} />
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="flex space-x-10 w-full justify-center">
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
        </div> */}

      {/* Tab contents */}
      {/* <div className="w-full">
          {activeTab === 0 && <Tab01 />}
          {activeTab === 1 && <Tab01 />}
          {activeTab === 2 && <Tab01 />}
        </div> */}

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
                {dataProduct.map((item, index) => {
                  return <ProductStanding product={item} key={index} />;
                })}
              </div>
            </div>
          );
        })}
      {/* Tin tức nổi bật */}
      <div className=" w-full pt-5 mt-3">
        <p className=" text-3xl font-bold text-center uppercase mt-5 text-[#FFBA00]">
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
                  <div className="sm:w-1/2 relative  group ">
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
                      className="w-full h-[257px] group-hover:scale-110 transition-transform duration-300  object-cover"
                      alt="chair"
                    />
                  </div>
                  <div className="sm:w-1/2 sm:mt-0 mt-4 relative group">
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
                      className="w-full object-cover h-[257px] group-hover:scale-110 transition-transform duration-300"
                      alt="wall design"
                    />
                  </div>
                </div>
                <div className="relative group">
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
                    className="w-full mt-8 md:mt-6 hidden sm:block  h-[466.44px] object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between">
                <div className="relative group">
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
                    className="w-full sm:block hidden h-[466.44px] object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6 md:mt-6 mt-4">
                  <div className="relative w-full group">
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
                      className="w-full h-[257px] object-cover group-hover:scale-110 transition-transform duration-300"
                      alt="chair"
                    />
                  </div>
                  <div className="relative w-full sm:mt-0 mt-4 group">
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
                      className="w-full h-[257px] object-cover group-hover:scale-110 transition-transform duration-300"
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
