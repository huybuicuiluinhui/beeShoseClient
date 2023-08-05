import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../static";

const Header = () => {
  const listHeaderBrand = [
    "Giày Adidas",
    "Giày Thể Thao",
    "Giày Nike",
    "Giày Puma",
    "Giày New Balance",
    "Giày Puma",
    "Giày Convert",
  ];
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [showDropdown, setIsShowDropdown] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const handleHover = (isHovering: boolean) => {
    setShowTable(isHovering);
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const onShowDropdown = () => {
    setIsShowDropdown(!showDropdown);
  };
  console.log(showDropdown);

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
      <div className="w-full absolute z-40 bg-[#ececec] grid grid-cols-4 gap-4 px-3 py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {categories.map((item, index) => (
          <div className="">
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
        <nav className="bg-white border-gray-200 dark:bg-gray-900 py-2">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
            <div className="w-[20%]">
              <a href="/" className="flex items-center w-fit ">
                <img src={Images.iconLogo} className="h-10  mr-3" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  BeeShoes
                </span>
              </a>
            </div>
            <div className="flex flex-col items-center md:order-2">
              <button
                onClick={onShowDropdown}
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={Images.testAvatar}
                  alt="user photo"
                />
              </button>
              {/* Dropdown menu */}
              {!!showDropdown && (
                <div className="z-50  fixed top-14">
                  <div
                    className="  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white"
                        >
                          Đăng nhập
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Đăng kí
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Cài đặt
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex"
                        >
                          Thoát
                          <img src={Images.iconLogout} className="w-4 ml-3" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button
                    data-collapse-toggle="navbar-user"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-user"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 17 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1h15M1 7h15M1 13h15"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:flex-[0.9] md:order-1"
              id="navbar-user"
            >
              <ul className="flex flex-col flex-1 font-medium  md:p-0 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center justify-between ">
                <li className="w-[80%]">
                  <form>
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tìm kiếm sản phẩm tại đây....."
                        required
                      />
                      <button
                        type="submit"
                        className="text-black absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </li>

                <li>
                  <a
                    href="/cart"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    <img src={Images.iconCart} className="w-5 h-5" />
                  </a>
                </li>
                {/* <li>
                  <form>
                    <label
                      htmlFor="search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                        id="search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        required
                      />
                  
                    </div>
                  </form>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
        <div
          className="bg-black"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          <nav className=" dark:bg-neutral-600 bg-neutral-100">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
              <div className="flex items-center">
                <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                  <a
                    href="/"
                    className="block py-2 pl-3 pr-4 text-gray-900 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Trang chủ
                  </a>
                  {!!listHeaderBrand &&
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
          {showTable && <CategoryTable />}
        </div>
      </header>
    </div>
  );
};

export default Header;
