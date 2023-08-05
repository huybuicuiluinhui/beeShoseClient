import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import path from "../../constants/path";
import useBreadcrumbs, { BreadcrumbMatch } from "use-react-router-breadcrumbs";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import CSS cho slider
import ProductItem from "../../components/ProductItem";
import ProductPage from "../product";
import Images from "../../static";

interface CustomBreadcrumbMatch extends BreadcrumbMatch {
  url: string;
}
const ListProductsByBrand = () => {
  const breadcrumbs = useBreadcrumbs();
  const navigate = useNavigate();
  const id = useParams<{ id: string }>().id;
  const decodedId = decodeURIComponent(id!);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Giá trị mặc định của khoảng giá
  const handlePriceChange = (value: any) => {
    setPriceRange(value);
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  console.log(isDropdownOpen);

  return (
    <div className="w-full h-full ">
      <div className="flex w-full relative">
        <aside
          id="logo-sidebar"
          className="sticky   left-0  w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto    ">
            <div className="flex flex-col items-center w-full">
              <h2 className="text-black text-sm font-medium self-start pb-3">
                Lọc theo khoảng giá
              </h2>
              <Slider
                range
                min={0}
                max={1000}
                defaultValue={priceRange}
                onChange={handlePriceChange}
              />
              <p>Min Price: ${priceRange[0]}</p>
              <p>Max Price: ${priceRange[1]}</p>
            </div>
            <div className="flex flex-col items-center justify-center  w-full ">
              <button
                onClick={handleDropdownToggle}
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                className="self-start text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-1 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
                type="button"
              >
                Lọc theo kích thước
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
                <div className="  w-full p-3  rounded-lg shadow dark:bg-gray-700">
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="dropdownDefault"
                  >
                    <li className="flex items-center">
                      <input
                        id="apple"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="apple"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Apple (56)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="fitbit"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="fitbit"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Fitbit (56)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="dell"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="dell"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Dell (56)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="asus"
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="asus"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Asus (97)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="logitech"
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="logitech"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Logitech (97)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="msi"
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="msi"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        MSI (97)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="bosch"
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="bosch"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Bosch (176)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="sony"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="sony"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Sony (234)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="samsung"
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="samsung"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Samsung (76)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="canon"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="canon"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Canon (49)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="microsoft"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="microsoft"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Microsoft (45)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="razor"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="razor"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Razor (49)
                      </label>
                    </li>
                  </ul>
                </div>
              )}
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
