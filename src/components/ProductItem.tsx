import React, { useEffect, useState } from "react";
import { IDetailProduct, IInforShoe, Product } from "../types/product.type";
import { useNavigate } from "react-router-dom";
import path from "../constants/path";
import ReactImageMagnify from "react-image-magnify";
import axios from "axios";
import API from "../api";
import {
  convertToCurrencyString,
  findProductIdByName,
  renderColor,
} from "../utils/format";
import SimpleToast from "./Toast";
import { useShoppingCart } from "../context/shoppingCart.context";
import ModalComponent from "./Modal";
import Images from "../static";
import MyReactImageMagnify from "./ReactImageMagnify";
const ProductItem = ({
  product,
  shoeId,
  inforShoe,
}: {
  inforShoe: IInforShoe;
  product: IDetailProduct[];
  shoeId: number;
}) => {
  const navigate = useNavigate();
  const imgArr = [];
  const uniqueColors: any[] = [];
  const uniqueSizes: any[] = [];
  for (let i = 0; i < product.length; i++) {
    imgArr.push(product[i].images ? product[i].images.split(",") : []);
  }
  for (let i = 0; i < product.length; i++) {
    const color = product[i].color;
    if (!uniqueColors.includes(color)) {
      uniqueColors.push(color);
    }
  }
  for (let i = 0; i < product.length; i++) {
    const size = product[i].size;
    if (!uniqueSizes.includes(size)) {
      uniqueSizes.push(size);
    }
  }

  // const [activeImg, setActiveImage] = useState<string>(imgArr[0][0]);
  const [chooseSize, setChooseSize] = useState<any>();
  const [chooseColor, setChooseColor] = useState<any>();
  const [chooseSizeName, setChooseSizeName] = useState<string | number>();
  const [chooseColorName, setChooseColorName] = useState<string>();
  const [amount, setAmount] = useState(1);
  const [allSizeData, setAllSizeData] = useState<Product[]>([]);
  const [allColorData, setAllColorData] = useState<Product[]>([]);
  const [price, setPrice] = useState<number | undefined>(0);
  const [amountShoe, setAmountShoe] = useState<number>();
  const [showToast, setShowToast] = React.useState<boolean>(false);
  const [idAddToCart, setIdAddToCart] = useState<number>();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [code, setCode] = useState<string>();
  const { openCart, addMultipleToCart } = useShoppingCart();
  const getDataSize = async () => {
    let combinedData: Product[] = [];
    let currentPage = 1;
    while (true) {
      try {
        const response = await axios.get(API.getSizePage(currentPage));
        const data = response.data.data;

        if (data.length === 0) {
          break;
        }

        combinedData = [...combinedData, ...data];
        currentPage++;

        if (currentPage >= response.data.totalPages) {
          break;
        }
      } catch (error) {
        console.error(error);
        break;
      }
    }

    setAllSizeData(combinedData);
    setChooseSize(findProductIdByName(product[0]?.size, allSizeData));
  };
  const getDataColor = async () => {
    let combinedData: Product[] = [];
    let currentPage = 1;

    while (true) {
      try {
        const response = await axios.get(API.getColorPage(currentPage));
        const data = response.data.data;

        if (data.length === 0) {
          break;
        }

        combinedData = [...combinedData, ...data];
        currentPage++;

        if (currentPage >= response.data.totalPages) {
          break;
        }
      } catch (error) {
        console.error(error);
        break;
      }
    }

    setAllColorData(combinedData);
    setChooseColor(findProductIdByName(product[0]?.color, allColorData));
  };
  const getPriceDetailShoe = async () => {
    const res = await axios({
      method: "get",
      url: API.getPriceDetailShoe(inforShoe.name, chooseSize, chooseColor),
    });
    if (res.status) {
      if (res?.data?.totalPages === 0) {
        setPrice(0);
      }
      if (res?.data?.data[0]?.price) {
        setPrice(res?.data?.data[0].price);
        setAmountShoe(res?.data?.data[0].quantity);
        setIdAddToCart(res?.data?.data[0].id);
        setCode(res?.data.data[0].code);
      }
    }
  };
  useEffect(() => {
    getDataSize();
    getDataColor();
  }, []);
  useEffect(() => {
    setChooseSize(findProductIdByName(product[0]?.size, allSizeData));
    setChooseSizeName(product[0]?.size);
    setChooseColor(findProductIdByName(product[0]?.color, allColorData));
    setChooseColorName(product[0]?.color);
  }, [product, allSizeData, allColorData]);
  useEffect(() => {
    setAmountShoe(0);
    if (chooseColor && chooseSize) {
      getPriceDetailShoe();
    }
  }, [inforShoe.name, chooseSize, chooseColor]);
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex   justify-between lg:flex-row gap-16   infoShoe">
        <div className="flex flex-row gap-3 lg:w-[50%] slideImg">
          <MyReactImageMagnify img={imgArr} />
        </div>
        {/* Thong tin */}
        <div className="flex flex-col gap-2 lg:w-[50%] infoShoe2  ">
          <div className="font-medium">
            <span
              className="cursor-pointer  text-xs  text-[#909097] "
              onClick={() => {
                navigate(path.home);
              }}
            >
              Trang chủ
            </span>{" "}
            /
            <span
              className="text-xs  text-[#909097]"
              onClick={() => navigate(path.listProductsByBrand)}
            >
              {inforShoe?.brand.name}
            </span>
            / <span className="text-[#000] text-xs ">{inforShoe?.name}</span>
          </div>
          <span className="text-3xl font-medium text-black  ">
            {inforShoe?.name}
          </span>
          <h6 className="text-2xl font-semibold text-[#942319]">
            {!!price
              ? `${convertToCurrencyString(price)}`
              : "Sản phẩm hiện hết hàng"}
          </h6>
          <div className="w-full flex justify-between items-center">
            <span className="text-sm font-semibold ">Chọn kích thước</span>
            <div
              className="flex cursor-pointer"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABVklEQVR4nO2Uy0rDUBCGTxfudCcFBcUZQUFw5QuIC8G9guuCM6EvYEEUQUF3PoRvIF7eQRdeXqLYzARb3Gpk0qSm2JpEGgRx4CyS+fm/MxeOc38y0GtWkfQYWe6R5bz3nzW0k/d7YADpFrB2EjGy3o4MACybSPLWFcrFPPurKxSO5TX4Nh+1heUlElHQKGzgMvLAepTcPK8BFmkRkjxY0tpSDoD11ZJL9edxV0ZAvDmLNX+iFACSPBpgjmQ9WxssA0sLOKjnB7CcxEO+zNICyVWsPcgNmKn500Da7q6p7DsXVr6qwkrqIrpAncncgKgKT7eR5d0MgOUGd3TDhm4HPX8NWK6TTQGWvULmaUivEh50RK3CT5AeFobMUmsqfuyekCSwFQbWu8jYa1aji6SgP4JkVkq62w+R03/I0LAZ9C3CkNd4ZBAgbbsyAilomDmwnpUC+JX4AHXtSTRt48bdAAAAAElFTkSuQmCC" />
              <span className="underline text-[#2267ed] text-sm font-semibold">
                Hướng dẫn chọn size
              </span>
            </div>
          </div>
          <div className="flex items-center w-full flex-wrap ">
            {!!uniqueSizes &&
              uniqueSizes.map((e, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setChooseSize(findProductIdByName(e, allSizeData));
                      setChooseSizeName(e);
                    }}
                    className={`min-w-[50px] text-center cursor-pointer px-1 py-[4px] mx-2 border-solid border-[1px] border-gray-400 rounded mb-1 ${
                      chooseSizeName === e ? "bg-[#111111]  text-[#fff]" : ""
                    }`}
                  >
                    {e}
                  </div>
                );
              })}
          </div>
          <span className="text-sm font-semibold ">Chọn màu sắc :</span>
          <div className="flex w-full items-center">
            <div className="flex items-center  flex-wrap">
              {!!uniqueColors &&
                uniqueColors.map((e, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setChooseColor(findProductIdByName(e, allColorData));
                        setChooseColorName(e);
                      }}
                      className={` min-w-[50px] text-center cursor-pointer px-1 py-[4px] mx-2 border-solid border-[1px] border-gray-400  mb-1 rounded
            
            ${chooseColorName === e ? "bg-[#111111]  text-[#fff]" : ""}`}
                    >
                      {e}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex justify-between ">
            <div className="flex flex-row items-center gap-10 mr-10">
              {/* <span className="text-sm font-semibold ">Số lượng</span> */}
              <div className="flex flex-row  ">
                <div className=" border-l-[1px] border-t-[1px] border-b-[1px] border-[#e9e9e9] w-full flex items-center justify-center">
                  <span className=" px-3 rounded-lg w-8">{amount}</span>
                </div>
                <div className="flex flex-col">
                  <button
                    className="w-8  h-[50%]  border-[1px] border-[#e9e9e9] "
                    onClick={() => {
                      if (amountShoe === amount) {
                        alert("Số lượng sản phẩm đã đạt tối đa");
                        return;
                      } else {
                        setAmount((prev) => prev + 1);
                      }
                    }}
                  >
                    <span className="leading-[5px]">+</span>
                  </button>
                  <button
                    className="w-8 h-[50%] border-[1px] border-[#e9e9e9] "
                    onClick={() => {
                      setAmount((prev) => {
                        if (prev > 1) {
                          return prev - 1;
                        } else {
                          return 1;
                        }
                      });
                    }}
                  >
                    <span>-</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <div
                className={`cursor-pointer  text-white font-semibold  flex  items-center justify-center  w-[49%] 
                ${!!price ? "bg-[#0161e7]" : "bg-[#0161e767]"}
                `}
                onClick={
                  // () =>

                  () => {
                    if (!!idAddToCart && !!price) {
                      addMultipleToCart(idAddToCart, amount);
                      // setShowToast(true);
                      openCart();
                    } else {
                      alert("Bạn cần chọn sản phẩm khác");
                    }
                  }
                }
              >
                <span>Thêm vào giỏ hàng</span>
              </div>

              <button
                className={`bg-[#fe662b] text-white font-semibold  w-[49%] 
                ${!!price ? "bg-[#fe662b]" : "bg-[#fe672b58]"}
              `}
                onClick={() => {
                  if (!!idAddToCart && !!price) {
                    addMultipleToCart(idAddToCart, amount);
                    setShowToast(true);
                    navigate(path.payment);
                  } else {
                    alert("Bạn cần chọn sản phẩm khác");
                  }
                }}
              >
                Mua ngay
              </button>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-300" />
          <div className="flex justify-between">
            <span className="font-semibold text-sm">
              Mã <br />
              <span className="font-normal text-[11px]">
                {!!price ? code : ""}
              </span>
            </span>
            <span className="font-semibold text-sm">
              Danh mục <br />
              <span className="font-normal text-[11px]">
                {!!price ? inforShoe?.category?.name : ""}
              </span>{" "}
            </span>
            <span className="font-semibold text-sm">
              Thương hiệu <br />
              <span className="font-normal text-[11px]">
                {!!price ? inforShoe?.brand?.name : ""}
              </span>{" "}
            </span>
          </div>
          <div className="h-8">
            {!!amountShoe && (
              <span className="font-semibold text-sm">
                Số lượng hàng có sẵn :{" "}
                <span className="font-normal text-[11px]">{amountShoe}</span>{" "}
              </span>
            )}
          </div>
        </div>
      </div>
      {showToast && (
        <SimpleToast
          typeToast="success"
          message="Thêm vào giỏ hàng thành công"
        />
      )}
      {showModal && (
        <ModalComponent
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <section className="bg-gray-50 ">
            <img
              src={Images.tableSize}
              alt=""
              className="w-full h-auto object-contain"
            />
          </section>
        </ModalComponent>
      )}
    </div>
  );
};

export default ProductItem;
