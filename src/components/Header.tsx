import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../static";
import path from "../constants/path";
import axios from "axios";
import { IProduct, Product } from "../types/product.type";
import slugify from "slugify";
import FormLogin from "../pages/loginAndRegister";
import { toSlug } from "../utils/format";
import { useShoppingCart } from "../context/shoppingCart.context";
import API from "../api";

const Header = () => {
  const navigate = useNavigate();
  const { cartQuantity, openCart } = useShoppingCart();
  const [showTable, setShowTable] = useState<boolean>(false);
  const [results, setResults] = useState<IProduct[]>([]);
  const [listBrandHeader, setListBrandHeader] = useState<Product[]>();
  const [listCategory, setListCategory] = useState<Product[]>();
  const [isHeaderSticky, setIsHeaderSticky] = useState<boolean>(false);
  const [showDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState<string>();
  // const handleCategoryClick = (category: string) => {
  //   setSelectedCategory(category);
  // };
  const onShowDropdown = (isShowDropDown: boolean) => {
    setIsShowDropdown(isShowDropDown);
  };
  const handleHover = (isHovering: boolean) => {
    if (!showModal) {
      setShowTable(isHovering);
    }
  };
  const getDataBrand = async () => {
    const res = await axios({
      method: "get",
      url: API.getBrand(),
    });
    if (res.status) {
      setListBrandHeader(res.data?.data);
    }
  };
  const getCategory = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getCategory(),
      });
      if (res.status) {
        setListCategory(res.data?.data);
      }
    } catch (error) {
      console.error("Error fetching shoe details: ", error);
    }
  };
  const fetchDataSearch = (value: string) => {
    fetch(API.getAllShoe(1, 1000000))
      .then((responsive) => responsive.json())
      .then((json) => {
        const results = json?.data.filter((search: IProduct) => {
          return (
            value &&
            search &&
            search.name &&
            search.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };
  const handleChange = (value: string) => {
    setSearchValue(value);
    fetchDataSearch(value);
  };
  useEffect(() => {
    getDataBrand();
    getCategory();
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
    return (
      <div className="w-full bg-[#ececec] absolute  z-40 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <ul
          className="max-w-screen-xl px-4  mx-auto   flex flex-col   py-2 "
          onMouseEnter={() => {
            handleHover(true);
          }}
          onMouseLeave={() => {
            handleHover(false);
          }}
        >
          {!!listBrandHeader &&
            !!listBrandHeader.length &&
            listBrandHeader.map((item, index) => (
              <li
                key={index}
                className="relative tracking-wider btn4 leading-none overflow-hidden py-3  w-fit "
              >
                <span
                  className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#FFBA00] w-full `}
                />
                <span
                  className={`cursor-pointer  hover:text-[#FFBA00] ${
                    // selectedCategory === item.name
                    //   ? "text-[#FFBA00] : "
                    "text-gray-900"
                  }`}
                  onClick={() => {
                    navigate(`${toSlug(item.name)}`, {
                      state: item,
                    });
                  }}
                >
                  {item.name}
                </span>
              </li>
            ))}
        </ul>
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
        <nav className="bg-[#ffba00]  ">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 ">
            <div className="w-[5%]">
              <a href="/" className="flex items-center w-fit ">
                <img
                  src={Images.BeeShoes}
                  className="w-[80px] object-cover h-auto"
                />
                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                  BeeShoes
                </span> */}
              </a>
            </div>
            {/* <div
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
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
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
              {!!showDropdown && (
                <div className="z-50  fixed top-6 ml-8">
                  <div
                    className="  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow  "
                    id="user-dropdown"
                  >
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li
                        className=""
                        onClick={() => {
                          navigate(path.information);
                        }}
                      >
                        <a className="hover:text-[#FABA00] cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100   ">
                          Tài khoản của tôi
                        </a>
                      </li>
                      <li className="">
                        <a
                          onClick={() => {
                            setTypeModal(1);
                            setShowModal(true);
                          }}
                          className="hover:text-[#FABA00] cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100   "
                        >
                          Đăng nhập
                        </a>
                      </li>

                      <li>
                        <a
                          onClick={() => {
                            setTypeModal(2);
                            setShowModal(true);
                          }}
                          className=" hover:text-[#FABA00]  cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100   "
                        >
                          Đăng ký
                        </a>
                      </li>
                      <li>
                        <a
                          href={path.invoice}
                          className="hover:text-[#FABA00]  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100   "
                        >
                          Đơn mua
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className=" hover:text-[#FABA00]  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100   "
                        >
                          Cài đặt
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="hover:text-[#FABA00]  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  flex"
                        >
                          Thoát
                          <img src={Images.iconLogout} className="w-4 ml-3" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div> */}
            <div
              className=" w-full items-center justify-between hidden  md:flex md:flex-[0.95] md:order-1"
              id="navbar-user"
            >
              <ul className="flex flex-col flex-1 list-none font-medium  md:p-0 mt-2 border  md:flex-row md:space-x-8 md:mt-0 md:border-0  items-center justify-around ">
                <li className="flex-[3.5]">
                  <div className="relative w-full ">
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
                      value={searchValue}
                      onChange={(e) => handleChange(e.target.value)}
                      className="placeholder:text-gray-600 block w-full p-4 pl-10 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 h-10  "
                      placeholder="Tìm kiếm sản phẩm tại đây....."
                      required
                    />
                    <div className="w-full absolute bg-white z-[1000] mt-1 rounded px-3 max-h-[200px] overflow-y-scroll ">
                      {!!results &&
                        !!results.length &&
                        results.map((result, index) => {
                          return (
                            <p
                              key={index}
                              className="text-sm font-medium mb-2 hover:bg-[#f4f4f4] cursor-pointer"
                              onClick={() => {
                                setSearchValue(result.name);
                                setResults([]);
                                navigate(path.product, { state: result.id });
                              }}
                            >
                              {result.name}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                </li>
                <li className="flex-1 cursor-pointer">
                  <div
                    className=" flex justify-center items-center my-auto "
                    onClick={() => {}}
                  >
                    <div className="">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/ios/50/phone--v2.png"
                        alt="phone--v2"
                      />
                    </div>
                    <div className="ml-3">
                      <p className=" text-xs ">Liên hệ</p>
                      <p className="text-sm font-medium"> 0376426057</p>
                    </div>
                  </div>
                </li>

                <li
                  className="flex-[1.3] px-0 cursor-pointer"
                  onClick={() => {
                    navigate(path.invoice);
                  }}
                >
                  <div
                    className=" flex justify-center items-center my-auto "
                    onClick={() => {}}
                  >
                    <img
                      src={Images.iconBox}
                      alt=""
                      className="w-[22px] h-[22px] object-contain"
                    />
                    <div className="ml-3">
                      <p className="text-xs">Theo dõi đơn hàng</p>
                      <p className="text-sm font-medium">Tra cứu đơn hàng</p>
                    </div>
                  </div>
                </li>

                <li
                  className="flex-1 px-0 cursor-pointer"
                  onClick={() => {
                    openCart();
                    // navigate(path.cart);
                  }}
                >
                  <div className=" flex justify-center items-center my-auto ">
                    {cartQuantity > 0 && (
                      <div className=" relative">
                        <div className=" absolute left-3 -top-[30%]">
                          <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                            {cartQuantity}
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
                    )}
                    <div className="ml-3">
                      <p className="text-xs">Giỏ hàng</p>
                      <span className="text-sm font-medium">
                        {cartQuantity} sản phẩm{" "}
                      </span>
                    </div>
                  </div>
                </li>
                <li
                  className="flex-[1.4] px-0 cursor-pointer"
                  onClick={() => {
                    navigate(path.information);
                  }}
                >
                  <div
                    className=" flex justify-center items-center my-auto "
                    onClick={() => {}}
                  >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABYklEQVR4nOXVMUtdQRAF4E+jkkIiWgQRbIQkZbA1EItYmSbYiggaor0EK0WsJIXxF2htMI3w0ijxD1jYiNFCwRQhTSSkMaI+WRhBhIv3el8hvAPLMDNn7tndO7tLvaENs9jGz7AzEa8JnuMIVfzAetjkH+JZWYEW7OEv3t3KDUV8F81lREZixuMZ+feRHy4jsoIzPM7IN+EflsuIfMXvOzjHWCsj8im2ozsj34ULLJQR6cUlvqDhVq4hVpBEXiqJpVjNBvrwFK+wGfFFNUAj5nEaH70eyZ+LfM3QiVFMh03+w8cLjOFDgTEWV1AuvI0DWL3H+I/BPCJbcdOm9u0pMHqj7nsekZ28xIwJpvo7kQ7eHzxRDG04wWoecn+c8gpacwq04lvUvc47q49RkB6rCbRn8DowGbzEn1IQqcv2o2vO43GqxHZWwj+/8WIm/r3wCAP4HD/1AL/CpuZI8TfBqwNcAfyqZT4CcuOBAAAAAElFTkSuQmCC" />
                    <div className="ml-3">
                      <p className="text-xs">Tài khoản</p>
                      <p className="text-sm font-medium">Đăng nhập/Đăng ký</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* title brand */}
        {!!listCategory && !!listCategory.length && (
          <nav className="  bg-[#f5f5f5]">
            <div className="max-w-screen-xl px-4  mx-auto">
              <div className="flex items-center ">
                <ul className="flex flex-row font-medium  mr-6 space-x-8 text-sm ">
                  <li
                    onClick={() => {
                      // handleCategoryClick("all");
                    }}
                    className="relative tracking-wider btn4 leading-none overflow-hidden py-3   "
                  >
                    <span
                      className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#FFBA00]   `}
                    />

                    <a
                      onClick={() => {
                        navigate(`${toSlug("Tất cả sản phẩm")}`, {
                          state: {
                            name: "Tất cả sản phẩm",
                            id: 0,
                          },
                        });
                      }}
                      className={`cursor-pointer  hover:text-[#FFBA00] }`}
                      aria-current="page"
                    >
                      Tất cả sản phẩm
                    </a>
                  </li>
                  <li
                    onMouseEnter={() => {
                      handleHover(true);
                    }}
                    onMouseLeave={() => {
                      handleHover(false);
                    }}
                    className="relative tracking-wider btn4 leading-none overflow-hidden py-3   "
                  >
                    <span
                      className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#FFBA00]   `}
                    />

                    <a
                      // href="/"
                      className={`cursor-pointer  hover:text-[#FFBA00] }`}
                      aria-current="page"
                    >
                      Thương hiệu
                    </a>
                  </li>
                  {listCategory.map((item, index) => {
                    return (
                      <li
                        onClick={() => {
                          // handleCategoryClick(item.name);
                          navigate(`${toSlug(item.name)}`, {
                            state: {
                              item,
                              status: true,
                            },
                          });
                        }}
                        key={index}
                        className="relative tracking-wider btn4 leading-none overflow-hidden py-3   "
                      >
                        <span
                          className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#FFBA00]  `}
                        />
                        <span
                          className={`cursor-pointer  hover:text-[#FFBA00] ${
                            // selectedCategory === item.name
                            //   ? "text-[#FFBA00] :  "
                            "text-gray-900"
                          }`}
                        >
                          {item.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>
        )}
      </header>
      {showTable && <CategoryTable />}
      <FormLogin
        showModal={showModal}
        setShowModal={setShowModal}
        typeModal={typeModal}
        setTypeModal={setTypeModal}
      />
    </div>
  );
};

export default Header;
