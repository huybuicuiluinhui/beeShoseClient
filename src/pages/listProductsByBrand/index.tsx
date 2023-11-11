import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import path from "../../constants/path";
import "rc-slider/assets/index.css"; // Import CSS cho slider
import axios from "axios";
import API from "../../api";
import { IProduct, Product } from "../../types/product.type";
import ProductStanding from "../../components/ProductStanding";
import NavPage from "../../components/NavPage";
import SekeletonItemShoe from "../../components/SekeletonItemShoe";
import Fade from "react-reveal/Fade";
import { toSlug } from "../../utils/format";
interface ShoeSize {
  size: number;
  selected: boolean;
}
interface ShoeMaterial {
  material: string;
  selected: boolean;
}
interface ShoseBrand {
  brand: string;
  selected: boolean;
}
const ListProductsByBrand = () => {
  const location = useLocation();
  const param = location.state;
  console.log("res", param);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState<boolean>(true);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState<boolean>(true);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState<boolean>(true);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [priceRange2, setPriceRange2] = useState([
    {
      id: 1,
      priceRange: "0₫ - 1.000.000₫",
    },
    {
      id: 2,
      priceRange: "1.000.000₫ - 3.000.000₫",
    },
    {
      id: 3,
      priceRange: "3.000.000₫ - 5.000.000₫",
    },
    {
      id: 4,
      priceRange: "5.000.000₫ - 7.000.000₫",
    },
    {
      id: 5,
      priceRange: "7.000.000₫ - 10.000.000₫",
    },
    {
      id: 6,
      priceRange: "10.000.000₫ - 40.000.000₫",
    },
  ]);
  const [selectedSizes, setSelectedSizes] = useState<ShoeSize[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<ShoeMaterial[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<ShoseBrand[]>([]);
  const [shoeSizes, setShoesSize] = useState<Product[]>();
  const [materials, setMaterials] = useState<Product[]>();
  const [brands, setBrands] = useState<Product[]>();
  const [listShoes, setListShoes] = useState<IProduct[]>();
  const [sekeletonItemShoe, setSekeletonItemShoe] = useState<boolean>(true);

  const [isCheckedSize, setIsCheckedSize] = useState<boolean>(false);
  const [isCheckedBrand, setIsCheckedBrand] = useState<boolean>(false);
  const [isCheckedSole, setIsCheckedSole] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState(""); // Trạng thái để lưu giá trị được chọn

  // ----------------------------------------------------------------

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value); // Cập nhật giá trị khi tùy chọn thay đổi
  };
  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedSize(event.target.checked);
  };

  const handleChangeBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedBrand(event.target.checked);
  };
  const handleChangeSole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedSole(event.target.checked);
  };

  // ----------------------------------------------------------------
  const handleSizeSelect = (size: number) => {
    setSelectedSizes((prevSizes) => {
      const existingSize = prevSizes.find((s) => s.size === size);
      if (existingSize) {
        return prevSizes.filter((s) => s.size !== size);
      } else {
        return [...prevSizes, { size, selected: true }];
      }
    });
  };
  const handleMaterialsSelect = (material: string) => {
    setSelectedMaterials((prevMaterial) => {
      const existingSize = prevMaterial.find((s) => s.material === material);
      if (existingSize) {
        return prevMaterial.filter((s) => s.material !== material);
      } else {
        return [...prevMaterial, { material, selected: true }];
      }
    });
  };
  const handleBrandsSelect = (brand: string) => {
    setSelectedBrands((prevBrands) => {
      const existingSize = prevBrands.find((s) => s.brand === brand);
      if (existingSize) {
        return prevBrands.filter((s) => s.brand !== brand);
      } else {
        return [...prevBrands, { brand, selected: true }];
      }
    });
  };
  const handlePriceChange = (value: any) => {
    setPriceRange(value);
  };
  // ----------------------------------------------------------------

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownTogglePrice = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };
  const handleDropdownToggleMaterial = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };
  const handleDropdownToggleBrand = () => {
    setIsDropdownOpen4(!isDropdownOpen4);
  };
  // ----------------------------------------------------------------
  const getDataSize = async () => {
    const res = await axios({
      method: "get",
      url: API.getSizeAll(),
    });
    if (res.status) {
      setShoesSize(res?.data?.data);
    }
  };
  console.log("listShoes", listShoes);
  // call dữ liệu
  //  theo chất liệu
  const getDataSole = async () => {
    const res = await axios({
      method: "get",
      url: API.getSole(),
    });
    if (res.status) {
      setMaterials(res.data?.data);
    }
  };
  //  theo thương hiệu
  const getBrand = async () => {
    const res = await axios({
      method: "get",
      url: API.getBrandAllPage(1, 1000000),
    });
    if (res.status) {
      setBrands(res?.data?.data);
    }
  };
  // lấy thương hiệu chọn
  const getDataBrandChoose = async () => {
    if (param?.status == true) {
      const res = await axios({
        method: "get",
        url: API.getShoeWithCategory(param?.item?.id, page, 20),
      });
      if (res.status) {
        setSekeletonItemShoe(true);
        setListShoes(res?.data?.data);
        setTotalPage(res.data?.totalPages);
      }
    } else {
      if (!!param?.id) {
        const res = await axios({
          method: "get",
          url: API.getBrandChoose(param?.id, page, 20),
        });
        if (res.status) {
          setSekeletonItemShoe(true);
          setListShoes(res?.data?.data);
          setTotalPage(res.data?.totalPages);
        }
      } else {
        const res = await axios({
          method: "get",
          url: API.getAllShoe(page, 20),
        });
        if (res.status) {
          setSekeletonItemShoe(true);
          setListShoes(res?.data?.data);
          setTotalPage(res.data?.totalPages);
        }
      }
    }
  };
  console.log("listShoes", listShoes);
  useEffect(() => {
    getDataBrandChoose();
  }, [param, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataSize();
    getDataSole();
    getBrand();
  }, []);
  return (
    <div className="w-full h-full ">
      <div className="flex w-full relative">
        {/* Lọc */}
        <aside
          id="logo-sidebar"
          className="sticky  left-0  w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mt-[78px] "
          aria-label="Sidebar"
        >
          <span className="text-xl font-semibold text-gray-700">Bộ lọc</span>
          <div className=" mx-2 my-5 h-fit border-[1px] border-solid border-[#EDEDED]">
            <div className="flex flex-col items-center justify-center  w-full ">
              <button
                onClick={handleDropdownToggle}
                className="flex relative btn4 self-start bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center justify-between items-center border border-white  uppercase  tracking-wider  overflow-hidden w-full"
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                <p className="font-medium text-xs">kích thước size</p>
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="  w-full  rounded-lg mt-1  px-2">
                  <div
                    className="grid grid-cols-2 gap-2 "
                    aria-labelledby="dropdownDefault"
                  >
                    {!!shoeSizes?.length &&
                      shoeSizes.map((size, index) => {
                        const isSelected = selectedSizes.some(
                          (s) => s.size === Number(size.name) && s.selected
                        );
                        return (
                          <div
                            key={size.id}
                            className={` cursor-pointer flex items-center justify-center rounded py-1 w-full hover:bg-gray-500 ${
                              isSelected
                                ? "bg-gray-500 text-white"
                                : "bg-[#EDEDED] "
                            }   `}
                            onClick={() => handleSizeSelect(Number(size.name))}
                          >
                            <span
                              className={` text-sm font-medium 
                   ${isSelected ? " text-white" : " text-gray-900"}    `}
                            >
                              {size.name}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              {/* Theo thương hiệu */}
              <button
                onClick={handleDropdownToggleBrand}
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                className="relative btn4 self-start  bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center flex justify-between items-center border border-white  uppercase  tracking-wider leading-none overflow-hidden w-full mt-2 "
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                <p className="font-medium text-xs">Thương hiệu</p>

                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen4 && (
                <div className="  w-full  rounded-lg ">
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="dropdownDefault"
                  >
                    {!!brands &&
                      !!brands.length &&
                      brands.map((brand, index) => {
                        const isSelected = selectedBrands.some(
                          (s) => s.brand === brand.name && s.selected
                        );
                        console.log("isSelected ", isSelected);
                        return (
                          <li
                            key={brand.id}
                            className="flex items-center cursor-pointer"
                            onClick={() => handleBrandsSelect(brand.name)}
                          >
                            <input
                              onChange={handleChangeBrand}
                              id={`brand-${brand.id}`}
                              type="checkbox"
                              checked={isSelected}
                              className="w-4 h-4 bg-white border-gray-300 rounded text-primary-600 checked:bg-gray-500  focus:ring-0 "
                            />
                            <label
                              // htmlFor={`brand-${brand.id}`}
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                            >
                              {brand.name}
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}
              {/* theo chất liệu */}
              <button
                onClick={handleDropdownToggleMaterial}
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                className="relative btn4 self-start  bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center flex justify-between items-center border border-white  uppercase  tracking-wider leading-none overflow-hidden w-full  mt-2"
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                <p className="font-medium text-xs">Chất liệu</p>

                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen3 && (
                <div className="  w-full  rounded-lg ">
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="dropdownDefault"
                  >
                    {!!materials &&
                      !!materials.length &&
                      materials.map((material, index) => {
                        const isSelected = selectedMaterials.some(
                          (s) => s.material === material.name && s.selected
                        );
                        return (
                          <li
                            key={index}
                            className="flex items-center cursor-pointer"
                            onClick={() => handleMaterialsSelect(material.name)}
                          >
                            <input
                              onChange={handleChangeSole}
                              id={`material-${material.id}`}
                              type="checkbox"
                              checked={isSelected}
                              className="w-4 h-4 bg-white border-gray-300 rounded text-primary-600 checked:bg-[#FFBA00]  focus:ring-0"
                            />
                            <span
                              // htmlFor={`material-${material.id}`}
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                            >
                              {material.name}
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}

              <div className=" w-full">
                <button
                  onClick={handleDropdownTogglePrice}
                  id="dropdownDefault"
                  data-dropdown-toggle="dropdown"
                  className="relative btn4 self-start  bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center flex justify-between items-center border border-white  uppercase  tracking-wider leading-none overflow-hidden w-full  mt-2"
                  type="button"
                >
                  <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                  <p className="font-medium text-xs">khoảng giá</p>
                  <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen2 && (
                  <Fragment>
                    <div>
                      {priceRange2.map((item, index) => {
                        return (
                          <div
                            className="flex items-center mb-4 cursor-pointer"
                            key={item.id}
                          >
                            <input
                              id={`default-radio-${item.id}`}
                              type="radio"
                              value={item.priceRange}
                              name="default-radio"
                              className="w-4 h-4 text-blue-600 bg-white border-gray-300 checked:bg-[#FFBA00]  focus:ring-0"
                            />
                            <span
                              // htmlFor={`default-radio-${item.id}`}
                              className="ml-2 text-sm font-medium text-gray-900 "
                            >
                              {item.priceRange}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2">
                      <div className="relative z-0  w-[45%]">
                        <input
                          value={priceRange[0]}
                          onChange={handlePriceChange}
                          type="text"
                          id="floating_standard"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_standard"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Giá thấp nhất
                        </label>
                      </div>

                      {/* <span className="text-red-500">{priceRange[0]} đ</span> */}
                      <br />

                      <div className="relative z-0  w-[45%]">
                        <input
                          value={priceRange[1]}
                          onChange={handlePriceChange}
                          type="text"
                          id="floating_standard"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder="  "
                        />
                        <label
                          htmlFor="floating_standard"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Giá cao nhất
                        </label>
                      </div>
                    </div>
                    {/* <Slider
                      range
                      min={0}
                      max={1000000}
                      defaultValue={priceRange}
                      onChange={handlePriceChange}
                    /> */}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* danh sách sản phẩm */}
        <div className="w-full mb-10">
          <div className="mx-auto  flex flex-col  my-4 items-center ">
            {!!param.status ? (
              <span className=" text-3xl font-medium">{param?.item?.name}</span>
            ) : (
              <span className=" text-3xl font-medium">{param?.name}</span>
            )}
          </div>
          <div className="w-full  mx-auto ">
            <div className="w-full flex justify-between items-center ">
              <div className="px-2">
                <span
                  className="cursor-pointer font-medium text-sm text-[#909097] "
                  onClick={() => {
                    navigate(path.home);
                  }}
                >
                  Trang chủ
                </span>
                /
                {!!param.status ? (
                  <span className=" text-sm font-medium ">
                    {" "}
                    {param?.item?.name}
                  </span>
                ) : (
                  <span className=" text-sm font-medium ">{param?.name}</span>
                )}
              </div>
              {/* Lọc sản phẩm */}
              <div>
                <select
                  value={selectedOption}
                  onChange={handleChangeSelect}
                  id="underline_select"
                  className="block py-1 px-2 w-full text-sm text-gray-500 bg-transparent border-solid border-1 border-gray-200  "
                >
                  <option selected value="US">
                    Sản phẩm mới
                  </option>
                  <option value="CA">Giá tăng dần</option>
                  <option value="FR">Giá giảm dần</option>
                  <option value="DE">Bán chạy</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mx-auto mt-4 px-2">
              <Fade top distance="10%" duration={1500}>
                {!!listShoes && !!listShoes.length
                  ? listShoes.map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            navigate(`/product/${item.id}`, {
                              state: item.id,
                            });
                          }}
                        >
                          <ProductStanding product={item} />
                        </div>
                      );
                    })
                  : !!sekeletonItemShoe &&
                    sekeletonItemShoe === true &&
                    Array(10)
                      .fill({})
                      .map((item, index) => {
                        return (
                          <div key={index}>
                            <SekeletonItemShoe />
                          </div>
                        );
                      })}
              </Fade>
            </div>
            {!!listShoes && !!listShoes.length && totalPage === 1 ? (
              ""
            ) : (
              <div className="my-10">
                <NavPage totalPages={totalPage} page={page} setPage={setPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductsByBrand;
