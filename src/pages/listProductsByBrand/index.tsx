import React, { Fragment, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import path from "../../constants/path";
import useBreadcrumbs, { BreadcrumbMatch } from "use-react-router-breadcrumbs";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import CSS cho slider
import ProductItem from "../../components/ProductItem";
import ProductPage from "../product";
import Images from "../../static";
import axios from "axios";
import API from "../../api";
import { IType } from "../../types/product.type";

interface CustomBreadcrumbMatch extends BreadcrumbMatch {
  url: string;
}
interface ShoeSize {
  size: number;
  selected: boolean;
}
interface ShoeMaterial {
  material: string;
  selected: boolean;
}

const ListProductsByBrand = () => {
  const breadcrumbs = useBreadcrumbs();
  const navigate = useNavigate();
  const id = useParams<{ id: string }>().id;
  const decodedId = decodeURIComponent(id!);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(true);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedSizes, setSelectedSizes] = useState<ShoeSize[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<ShoeMaterial[]>(
    []
  );
  const [shoeSizes, setShoesSize] = useState<IType[]>();
  const [materials, setMaterials] = useState<IType[]>([]);

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
    setSelectedMaterials((prevSizes) => {
      const existingSize = prevSizes.find((s) => s.material === material);
      if (existingSize) {
        return prevSizes.filter((s) => s.material !== material);
      } else {
        return [...prevSizes, { material, selected: true }];
      }
    });
  };
  const handlePriceChange = (value: any) => {
    setPriceRange(value);
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownTogglePrice = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };
  const handleDropdownToggleMaterial = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };
  const getDataSize = async () => {
    const res = await axios({
      method: "get",
      url: API.getSize(),
    });
    if (res.status) {
      setShoesSize(res.data);
    }
  };
  const getDataSole = async () => {
    const res = await axios({
      method: "get",
      url: API.getSole(),
    });
    if (res.status) {
      setMaterials(res.data);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataSize();
    getDataSole();
  }, []);
  return (
    <div className="w-full h-full ">
      <div className="flex w-full relative">
        <aside
          id="logo-sidebar"
          className="sticky   left-0  w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mt-32 "
          aria-label="Sidebar"
        >
          <span className="text-xl font-bold">Lọc sản phẩm</span>
          <div className="h-full px-2 py-4 overflow-y-auto ">
            <div className="flex flex-col items-center justify-center  w-full ">
              <button
                onClick={handleDropdownToggle}
                className="relative btn4 self-start  text-black font-medium  text-sm  py-2.5 text-center inline-flex items-center border border-white  uppercase  tracking-wider leading-none overflow-hidden"
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-slate-400" />
                kích thước size
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
                <div className="  w-full  rounded-lg mt-1 ">
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="dropdownDefault"
                  >
                    {!!shoeSizes?.length &&
                      shoeSizes.map((size, index) => {
                        const isSelected = selectedSizes.some(
                          (s) => s.size === Number(size.name) && s.selected
                        );
                        return (
                          <li
                            key={size.id}
                            className="flex items-center  "
                            onClick={() => handleSizeSelect(Number(size.name))}
                          >
                            <input
                              id="apple"
                              type="checkbox"
                              checked={isSelected}
                              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-gray-600 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="apple"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                            >
                              {size.name}
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
                className="relative btn4 self-start  text-black font-medium  text-sm  py-2.5 text-center inline-flex items-center border border-white  uppercase  tracking-wider leading-none overflow-hidden  "
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-slate-400" />
                Chất liệu
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
                            className="flex items-center"
                            onClick={() => handleMaterialsSelect(material.name)}
                          >
                            <input
                              id="apple"
                              type="checkbox"
                              checked={isSelected}
                              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="apple"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                            >
                              {material.name}
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}

              <div className="mt-2 w-full">
                <button
                  onClick={handleDropdownTogglePrice}
                  id="dropdownDefault"
                  data-dropdown-toggle="dropdown"
                  className="relative btn4 self-start  text-black font-medium  text-sm  py-2.5 text-center inline-flex items-center border border-white  uppercase  tracking-wider leading-none overflow-hidden  "
                  type="button"
                >
                  khoảng giá
                  <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-slate-400" />
                  <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
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
                    <Slider
                      range
                      min={0}
                      max={1000000}
                      defaultValue={priceRange}
                      onChange={handlePriceChange}
                    />
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </aside>
        <div className="w-full">
          {/* Nội dung */}
          <div className="mx-auto  flex flex-col  my-4 items-center ">
            <span className=" text-4xl ">{decodedId}</span>
          </div>
          <div className="w-full  mx-auto">
            <div className="px-2 ">
              {breadcrumbs.map(({ breadcrumb, match }: any, index) => (
                <React.Fragment key={index}>
                  <NavLink
                    to={match.url}
                    style={{
                      color: "#999",
                      fontSize: 13,
                    }}
                  >
                    {index === 2 ? decodedId : breadcrumb}
                  </NavLink>
                  {index !== breadcrumbs.length - 1 && " / "}
                </React.Fragment>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mx-auto mt-8 px-2">
              {Array(10)
                .fill(0)
                .map((_, i) => {
                  return (
                    <div className="w-60 h-fit group mx-auto" key={i}>
                      <div className="relative overflow-hidden">
                        <img
                          className="h-60 w-full object-cover"
                          src={Images.giay08}
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
        </div>
      </div>
    </div>
  );
};

export default ListProductsByBrand;
