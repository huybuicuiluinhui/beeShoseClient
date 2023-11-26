import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../static";
import path from "../constants/path";
import axios from "axios";
import { IProduct, Product } from "../types/product.type";
import FormLogin from "../pages/loginAndRegister";
import { toSlug } from "../utils/format";
import { useShoppingCart } from "../context/shoppingCart.context";
import API from "../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getCookie } from "../helper/CookiesRequest";
const Header = () => {
  const navigate = useNavigate();
  const { cartQuantity, openCart, cartItems } = useShoppingCart();
  const [showTable, setShowTable] = useState<boolean>(false);
  const [results, setResults] = useState<IProduct[]>([]);
  const [listBrandHeader, setListBrandHeader] = useState<Product[]>();
  const [listCategory, setListCategory] = useState<Product[]>();
  const [isHeaderSticky, setIsHeaderSticky] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>();
  const token = getCookie("customerToken");

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      const key = event.target.value;
      navigate(`/search/${toSlug(event.target.value)}`, {
        state: {
          key,
        },
      });
      setResults([]);
    }
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
      <div className="w-screen flex justify-center">
        <div
          className=" max-w-screen-xl mx-auto w-full bg-[#f2f2f2] absolute  z-40 shadow-[0_3px_10px_rgb(0,0,0,0.2)] max-h-64"
          onMouseEnter={() => {
            handleHover(true);
          }}
          onMouseLeave={() => {
            handleHover(false);
          }}
        >
          <div className="w-full flex  mx-10">
            <div className="w-[20%]">
              <span className="text-xs font-medium whitespace-nowrap text-black uppercase ">
                Thương hiệu
              </span>
              <ul className="mx-auto   flex flex-col   py-2 ">
                {!!listBrandHeader &&
                  !!listBrandHeader.length &&
                  listBrandHeader.map((item, index) => (
                    <Link
                      to={`/brand/${item.id}/${toSlug(item.name)}`}
                      key={index}
                      onClick={() => {
                        handleHover(false);
                      }}
                      className="relative tracking-wider btn4 leading-none overflow-hidden py-1  w-fit "
                    >
                      <span
                        className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca] w-full `}
                      />
                      <span
                        className={`cursor-pointer  text-[12px] hover:text-[#6756ca] ${"text-gray-900"}`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
              </ul>
            </div>

            <ul
              className=" w-full "
              onMouseEnter={() => {
                handleHover(true);
              }}
              onMouseLeave={() => {
                handleHover(false);
              }}
            >
              <span className="text-xs font-medium whitespace-nowrap text-black uppercase ">
                Danh mục
              </span>
              <div className="grid grid-rows-4 grid-flow-col ">
                {!!listCategory &&
                  !!listCategory.length &&
                  listCategory.map((item, index) => (
                    <Link
                      onClick={() => {
                        handleHover(false);
                      }}
                      to={`/category/${item.id}/${toSlug(item.name)}`}
                      key={index}
                      className="relative tracking-wider btn4 leading-none overflow-hidden py-1  w-fit group "
                    >
                      <span
                        className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca] w-full `}
                      />
                      <span
                        className={`cursor-pointer text-[12px] group-hover:text-[#6756ca] ${"text-gray-900"}`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
              </div>
            </ul>
          </div>
        </div>
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
        <nav className="bg-white  ">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 ">
            <div className="w-[5%]">
              <a href="/" className="flex items-center w-fit ">
                <LazyLoadImage
                  src={Images.BeeShoes}
                  className="w-[80px] object-cover h-auto"
                />
              </a>
            </div>

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
                      onChange={(e) => handleChange(e?.target?.value)}
                      className="placeholder:text-gray-600 block w-full p-4 pl-10 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 h-10  "
                      placeholder="Tìm kiếm sản phẩm tại đây....."
                      required
                      onKeyDown={(e) => handleKeyPress(e)}
                    />
                    <div className="w-full absolute bg-white z-[1000] mt-1 rounded px-3 max-h-[200px] overflow-y-scroll ">
                      {!!results &&
                        !!results.length &&
                        results.map((result, index) => {
                          return (
                            <div className="flex items-end justify-start mb-1 hover:bg-[#f4f4f4] transition-colors">
                              <LazyLoadImage
                                src={result.images}
                                alt=""
                                className="w-10 h-10 object-cover rounded mr-2  "
                              />
                              <p
                                key={index}
                                className="text-sm font-medium mb-2  cursor-pointer "
                                onClick={() => {
                                  setSearchValue(result.name);
                                  setResults([]);
                                  navigate(`/product/${result.id}`, {
                                    state: result.id,
                                  });
                                }}
                              >
                                {result.name}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </li>
                <li className="flex-1 cursor-pointer">
                  <div className=" flex justify-center items-center my-auto ">
                    <div className="">
                      <LazyLoadImage
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
                    navigate(path.lookUpOrders);
                  }}
                >
                  <div className=" flex justify-center items-center my-auto ">
                    <LazyLoadImage
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
                  }}
                >
                  <div className=" flex justify-center items-center my-auto ">
                    <div className=" relative">
                      {!!cartQuantity && cartQuantity > 0 && (
                        <div className=" absolute left-3 -top-[30%]">
                          <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                            {cartItems.length}
                          </p>
                        </div>
                      )}
                      <svg
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

                    <div className="ml-3">
                      <p className="text-xs">Giỏ hàng</p>
                      <span className="text-sm font-medium">
                        {cartItems.length} sản phẩm{" "}
                      </span>
                    </div>
                  </div>
                </li>
                <li
                  className="flex-[1.4] px-0 cursor-pointer"
                  // onClick={() => {
                  //
                  // }}
                >
                  <div
                    className=" flex justify-center items-center my-auto "
                    onClick={() => {
                      // setShowModal(true);
                      if (token) {
                        navigate(path.information);
                      } else {
                        navigate(path.loginScreen);
                      }
                    }}
                  >
                    <LazyLoadImage src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABYklEQVR4nOXVMUtdQRAF4E+jkkIiWgQRbIQkZbA1EItYmSbYiggaor0EK0WsJIXxF2htMI3w0ijxD1jYiNFCwRQhTSSkMaI+WRhBhIv3el8hvAPLMDNn7tndO7tLvaENs9jGz7AzEa8JnuMIVfzAetjkH+JZWYEW7OEv3t3KDUV8F81lREZixuMZ+feRHy4jsoIzPM7IN+EflsuIfMXvOzjHWCsj8im2ozsj34ULLJQR6cUlvqDhVq4hVpBEXiqJpVjNBvrwFK+wGfFFNUAj5nEaH70eyZ+LfM3QiVFMh03+w8cLjOFDgTEWV1AuvI0DWL3H+I/BPCJbcdOm9u0pMHqj7nsekZ28xIwJpvo7kQ7eHzxRDG04wWoecn+c8gpacwq04lvUvc47q49RkB6rCbRn8DowGbzEn1IQqcv2o2vO43GqxHZWwj+/8WIm/r3wCAP4HD/1AL/CpuZI8TfBqwNcAfyqZT4CcuOBAAAAAElFTkSuQmCC" />
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
              <div className="flex items-center overflow-x-auto no-scrollbar">
                <ul className="flex flex-row font-medium  mr-6 space-x-8 text-sm ">
                  <li className="relative tracking-wider btn4 leading-none overflow-hidden py-3 group  ">
                    <span
                      className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca]   `}
                    />
                    <Link
                      to={`/${toSlug("Tất cả sản phẩm")}`}
                      className={`cursor-pointer whitespace-nowrap group-hover:text-[#6756ca] font-sans }`}
                    >
                      Tất cả sản phẩm
                    </Link>
                  </li>
                  <li
                    onMouseEnter={() => {
                      handleHover(true);
                    }}
                    onMouseLeave={() => {
                      handleHover(false);
                    }}
                    className="relative tracking-wider btn4 whitespace-nowrap leading-none overflow-hidden py-3   "
                  >
                    <span
                      className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca]   `}
                    />

                    <a
                      className={`cursor-default   whitespace-nowrap hover:text-[#6756ca] font-sans}`}
                      aria-current="page"
                    >
                      Thương hiệu
                    </a>
                  </li>
                  <li
                    onMouseEnter={() => {
                      handleHover(true);
                    }}
                    onMouseLeave={() => {
                      handleHover(false);
                    }}
                    className="relative tracking-wider btn4 whitespace-nowrap leading-none overflow-hidden py-3 group  "
                  >
                    <span
                      className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca]   `}
                    />

                    <a
                      className={`cursor-default  whitespace-nowrap group-hover:text-[#6756ca] font-sans }`}
                      aria-current="page"
                    >
                      Danh mục
                    </a>
                  </li>
                  {listCategory.map((item, index) => {
                    if (index >= 12) {
                      return;
                    }
                    return (
                      <Link
                        to={`/category/${item.id}/${toSlug(item.name)}`}
                        key={index}
                        className="relative tracking-wider whitespace-nowrap btn4 leading-none overflow-hidden py-3  group "
                      >
                        <span
                          className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#6756ca]  `}
                        />
                        <span
                          className={`cursor-pointer whitespace-nowrap group-hover:text-[#6756ca] ${"text-gray-900"} font-sans`}
                        >
                          {item.name}
                        </span>
                      </Link>
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
