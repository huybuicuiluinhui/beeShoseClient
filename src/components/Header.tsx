import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../static";
import ModalComponent from "./Modal";
import SimpleToast from "./Toast";
import path from "../constants/path";
import axios from "axios";
import API from "../api";
import { IType } from "../types/product.type";
import { useData } from "../context/app.context";

const Header = () => {
  const navigate = useNavigate();
  const { sharedData } = useData();
  console.log("2", sharedData);

  const listHeaderBrand = [
    "Giày Adidas",
    "Giày Thể Thao",
    "Giày Nike",
    "Giày Puma",
    "Giày New Balance",
    "Giày Puma",
    "Giày Convert",
  ];
  const [listBrandHeader, setListBrandHeader] = useState<IType[]>();
  const [isHeaderSticky, setIsHeaderSticky] = useState<boolean>(false);
  const [showDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<number>(1);
  const [showToast, setShowToast] = React.useState<boolean>(false);
  const handleHover = (isHovering: boolean) => {
    if (!showModal) {
      setShowTable(isHovering);
    }
  };
  const onShowDropdown = (isShowDropDown: boolean) => {
    setIsShowDropdown(isShowDropDown);
  };
  const getDataBrand = async () => {
    const res = await axios({
      method: "get",
      url: API.getBrand(),
    });
    if (res.status) {
      setListBrandHeader(res.data);
    }
  };

  useEffect(() => {
    // getDataBrand();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const CategoryTable = () => {
    const categories = [
      {
        title: "Dòng giày nổi bật",
        data: [
          "Air Jordan",
          "Converse",
          "Air Force 1",
          "Ultraboost",
          "Nike Dunk",
          "Yeezy",
          "Air Max",
          "Run Star Hike",
        ],
      },
      {
        title: "Dòng giày nổi bật",
        data: [
          "Air Jordan",
          "Converse",
          "Air Force 1",
          "Ultraboost",
          "Nike Dunk",
          "Yeezy",
          "Air Max",
          "Run Star Hike",
        ],
      },
      {
        title: "Dòng giày nổi bật",
        data: [
          "Air Jordan",
          "Converse",
          "Air Force 1",
          "Ultraboost",
          "Nike Dunk",
          "Yeezy",
          "Air Max",
          "Run Star Hike",
        ],
      },
      {
        title: "Dòng giày nổi bật",
        data: [
          "Air Jordan",
          "Converse",
          "Air Force 1",
          "Ultraboost",
          "Nike Dunk",
          "Yeezy",
          "Air Max",
          "Run Star Hike",
        ],
      },
      {
        title: "Dòng giày nổi bật",
        data: [
          "Air Jordan",
          "Converse",
          "Air Force 1",
          "Ultraboost",
          "Nike Dunk",
          "Yeezy",
          "Air Max",
          "Run Star Hike",
        ],
      },
      {
        title: "Dòng giày nổi bật",
        data: [
          "Air Jordan",
          "Converse",
          "Air Force 1",
          "Ultraboost",
          "Nike Dunk",
          "Yeezy",
          "Air Max",
          "Run Star Hike",
        ],
      },
    ];

    return (
      <div className="w-full absolute z-40 bg-[#fff] grid grid-cols-4 gap-4 px-3 py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {categories.map((item, index) => (
          <div key={index}>
            <span className="text-base text-black font-normal border-b-2 border-solid border-[#000] pb-1">
              {item.title}
            </span>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {item.data.map((e, i) => {
                return <a href="#">{e}</a>;
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div
      className={`${
        isHeaderSticky ? "sticky top-0 bg-white shadow-md" : "relative"
      } top-0 left-0 w-full z-10`}
    >
      <header>
        <nav className="bg-[#ffba00]  py-2">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 ">
            <div className="w-[20%]">
              <a href="/" className="flex items-center w-fit ">
                <img src={Images.iconLogo} className="h-10  mr-3" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  BeeShoes
                </span>
              </a>
            </div>
            <div
              className="flex  items-center md:order-2"
              onMouseEnter={() => {
                onShowDropdown(true);
              }}
              onMouseLeave={() => {
                onShowDropdown(false);
              }}
            >
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={Images.iconAvatar}
                  alt="user photo"
                />
              </button>
              {/* Dropdown menu */}
              {!!showDropdown && (
                <div className="z-50  fixed top-6 ml-8">
                  <div
                    className="  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li className="">
                        <a
                          onClick={() => {
                            setShowModal(true);
                          }}
                          className="hover:text-[#FABA00] cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white"
                        >
                          Đăng nhập
                        </a>
                      </li>

                      <li>
                        <a
                          onClick={() => {
                            setShowModal(true);
                          }}
                          className=" hover:text-[#FABA00]  cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Đăng ký
                        </a>
                      </li>
                      <li>
                        <a
                          href={path.invoice}
                          className="hover:text-[#FABA00]  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white"
                        >
                          Đơn mua
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className=" hover:text-[#FABA00]  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Cài đặt
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="hover:text-[#FABA00]  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex"
                        >
                          Thoát
                          <img src={Images.iconLogout} className="w-4 ml-3" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:flex-[0.9] md:order-1"
              id="navbar-user"
            >
              <ul className="flex flex-col flex-1 list-none font-medium  md:p-0 mt-2 border  md:flex-row md:space-x-8 md:mt-0 md:border-0  items-center justify-around ">
                <li className="flex-[3]">
                  <form>
                    {/* <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label> */}
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                        <svg
                          className="w-4 h-4 text-gray-500 "
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
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className="placeholder:text-[#FABA00] block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500  "
                        placeholder="Tìm kiếm sản phẩm tại đây....."
                        required
                      />
                    </div>
                  </form>
                </li>
                <li className="flex-1 cursor-pointer">
                  <div
                    className=" flex justify-center items-center my-auto "
                    onClick={() => {}}
                  >
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/ios/50/phone--v2.png"
                      alt="phone--v2"
                    />
                    <div>
                      <span className="ml-3 hover:text-red-600">Liên hệ</span>
                    </div>
                  </div>
                </li>
                <li className="flex-1 px-0 cursor-pointer">
                  <div
                    className=" flex justify-center items-center my-auto "
                    onClick={() => {}}
                  >
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/ios/50/conference-call--v1.png"
                      alt="conference-call--v1"
                    />
                    <div>
                      <span className="ml-3 hover:text-red-600">
                        Về chúng tôi
                      </span>
                    </div>
                  </div>
                </li>

                <li
                  className="flex-1 px-0 cursor-pointer"
                  onClick={() => {
                    navigate(path.cart);
                  }}
                >
                  <div className=" flex justify-center items-center my-auto ">
                    <div className=" relative">
                      <div className=" absolute left-3 -top-[50%]">
                        <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                          3
                        </p>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="file:  h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 hover:text-red-600">Giỏ hàng </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
        // onMouseEnter={() => {
        //   handleHover(true);
        // }}
        // onMouseLeave={() => {
        //   handleHover(false);
        // }}
        >
          <nav className="  bg-white">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
              <div className="flex items-center">
                <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                  <a
                    href="/"
                    className="block py-2 pl-3 pr-4 text-[#ffba00]  rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Trang chủ
                  </a>
                  {!!listHeaderBrand &&
                    // listBrandHeader.length &&
                    listHeaderBrand.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link
                            to={`/danh-muc/${encodeURIComponent(item)}`}
                            className="text-gray-900 dark:text-white hover:underline"
                            aria-current="page"
                          >
                            {item}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </nav>
          {/* {showTable && <CategoryTable />} */}
          <ModalComponent
            isVisible={showModal}
            onClose={() => {
              setShowModal(false);
            }}
          >
            {sharedData === true || typeModal === 1 ? (
              <section className="bg-gray-50 dark:bg-gray-900 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                  <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                  >
                    <img
                      className="w-20 h-20 mr-2 object-contain"
                      src={Images.iconLogo}
                      alt="logo"
                    />
                    BeeShoes
                  </a>
                  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Đăng nhập ngay
                      </h1>
                      <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Số điện thoại hoặc Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Mật khẩu
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="remember"
                                className="text-gray-500 dark:text-gray-300"
                              >
                                Nhớ mật khẩu
                              </label>
                            </div>
                          </div>
                          <a
                            onClick={() => {
                              setTypeModal(3);
                              setShowToast(false);
                            }}
                            className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-500"
                          >
                            Quên mật khẩu?
                          </a>
                        </div>
                        <button
                          onClick={() => {
                            setShowToast(true);
                          }}
                          type="submit"
                          className="w-full text-white bg-purple-400 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                        >
                          Đăng nhập
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Bạn chưa có tài khoản?{" "}
                          <a
                            onClick={() => {
                              setTypeModal(2);
                              setShowToast(false);
                            }}
                            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                          >
                            Đăng ký ngay
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            ) : typeModal === 2 ? (
              <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                  <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                  >
                    <img
                      className="w-20 h-20 mr-2 object-contain"
                      src={Images.iconLogo}
                      alt="logo"
                    />
                    BeeShoes
                  </a>
                  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Tạo tài khoản
                      </h1>
                      <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Số điện thoại hoặc Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Mật khẩu
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Nhập lại mật khẩu
                          </label>
                          <input
                            type="confirm-password"
                            name="confirm-password"
                            id="confirm-password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              aria-describedby="terms"
                              type="checkbox"
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800"
                              required
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="terms"
                              className="font-light text-gray-500 dark:text-gray-300"
                            >
                              Tôi đồng ý với các{" "}
                              <a
                                className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                                href="#"
                              >
                                điều khoản
                              </a>
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-purple-600 hover:bg--700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                          onClick={() => {
                            setTypeModal(2);
                            setShowToast(true);
                          }}
                        >
                          Tạo tài khoản
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Bạn đã có tài khoản?{" "}
                          <a
                            onClick={() => {
                              setTypeModal(1);
                              setShowToast(false);
                            }}
                            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                          >
                            Đăng nhập ngay
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                  <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                  >
                    <img
                      className="w-20 h-20 mr-2 object-contain"
                      src={Images.iconLogo}
                      alt="logo"
                    />
                    BeeShoes
                  </a>
                  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Quên mật khẩu
                      </h1>
                      <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Số điện thoại hoặc Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Mật khẩu
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Nhập lại mật khẩu
                          </label>
                          <input
                            type="confirm-password"
                            name="confirm-password"
                            id="confirm-password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              aria-describedby="terms"
                              type="checkbox"
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800"
                              required
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="terms"
                              className="font-light text-gray-500 dark:text-gray-300"
                            >
                              Tôi đồng ý với các{" "}
                              <a
                                className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                                href="#"
                              >
                                điều khoản
                              </a>
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-purple-600 hover:bg--700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                          onClick={() => {
                            setTypeModal(3);
                            setShowToast(true);
                          }}
                        >
                          Gửi xác nhận
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Bạn đã có tài khoản?{" "}
                          <a
                            onClick={() => {
                              setTypeModal(1);
                              setShowToast(false);
                            }}
                            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                          >
                            Đăng nhập ngay
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </ModalComponent>
        </div>
      </header>
      {typeModal === 1 && showToast === true ? (
        <SimpleToast typeToast="success" message="Đăng nhập thành công" />
      ) : (
        typeModal === 2 &&
        showToast === true && (
          <SimpleToast typeToast="success" message="Đăng ký thành công" />
        )
      )}
    </div>
  );
};

export default Header;
