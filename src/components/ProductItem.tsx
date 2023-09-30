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
  for (let i = 0; i < product.length; i++) {
    imgArr.push(product[i].images ? product[i].images.split(",") : []);
  }
  const [activeImg, setActiveImage] = useState<string>(imgArr[0][0]);
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
  const { getItemQuantity, openCart, addMultipleToCart } = useShoppingCart();
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
      <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
        <div className="flex flex-row gap-3 lg:w-3/4">
          <div className="flex flex-col  h-auto  justify-between mr-5 ">
            {!!imgArr &&
              !!imgArr.length &&
              imgArr.map((item, index) => {
                return (
                  <div key={index}>
                    {!!item &&
                      !!item.length &&
                      item.map((child: string, childIndex: number) => {
                        return (
                          <img
                            key={childIndex}
                            src={child}
                            alt="123"
                            className={`w-24 h-24 rounded-md cursor-pointer object-contain border-[1px]  border-[#FFBA00] mb-2 ${
                              child.includes(activeImg)
                                ? "border-solid"
                                : "border-dashed"
                            }`}
                            onClick={() => setActiveImage(child)}
                          />
                        );
                      })}
                  </div>
                );
              })}
          </div>
          {/* <div className="w-[400px] h-[500px]  ">
            <div className="w-[80%]">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    isFluidWidth: true,
                    src: activeImg,
                    width: 140,
                    height: 162,
                  },
                  largeImage: {
                    src: activeImg,
                    width: 836,
                    height: 1100,
                  },
                }}
              />
            </div>
          </div> */}
          <img
            src={activeImg}
            alt=""
            className="w-[80%] h-auto aspect-square object-contain rounded-xl"
          />
        </div>
        {/* Thong tin */}
        <div className="flex flex-col gap-2 lg:w-2/4">
          <div>
            <span
              className="cursor-pointer hover:text-[#FFBA00] text-xs font-thin"
              onClick={() => {
                navigate(path.home);
              }}
            >
              Trang chủ
            </span>{" "}
            /{" "}
            <span className="text-xs font-thin">
              Danh mục: {inforShoe?.brand.name}
            </span>
            /{" "}
            <span className="text-[#FFBA00] text-xs font-thin">
              {inforShoe?.name}
            </span>
          </div>
          <span className="text-3xl font-medium text-black  ">
            {inforShoe?.name}
          </span>
          <h6 className="text-2xl font-semibold text-[#942319]">
            {!!price
              ? `${convertToCurrencyString(price)}`
              : "Sản phẩm hiện hết hàng"}
          </h6>
          <span className="text-sm font-semibold ">Chọn kích thước</span>
          <div className="flex items-center w-full flex-wrap ">
            {!!product &&
              product.map((e, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setChooseSize(findProductIdByName(e.size, allSizeData));
                      setChooseSizeName(e.size);
                    }}
                    className={`cursor-pointer px-1 py-[2px] mx-2 border-solid border-[1px] border-[#dcdcdc] rounded mb-1 ${
                      chooseSizeName === e.size
                        ? "border-[#ffba00] border-2 text-[#212529]"
                        : ""
                    }`}
                  >
                    {e.size}
                  </div>
                );
              })}
          </div>
          <span className="text-sm font-semibold ">Chọn màu sắc :</span>
          <div className="flex w-full items-center">
            <div className="flex items-center  flex-wrap">
              {!!product &&
                product.map((e, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setChooseColor(
                          findProductIdByName(e.color, allColorData)
                        );
                        setChooseColorName(e.color);
                      }}
                      className={` cursor-pointer px-1 py-[2px] mx-2 border-solid border-[1px] border-[#dcdcdc] mb-1  rounded
                      
                      ${
                        chooseColorName === e.color
                          ? "border-[#ffba00] border-2 text-[#212529]"
                          : ""
                      }`}
                    >
                      {e.color}
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
                    onClick={() => setAmount((prev) => prev + 1)}
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
                className=" cursor-pointer bg-[#0161e7] text-white font-semibold  flex  items-center justify-center  w-[49%]"
                onClick={
                  // () =>

                  () => {
                    if (!!idAddToCart) {
                      console.log("first", getItemQuantity(idAddToCart));
                      addMultipleToCart(idAddToCart, amount);
                      setShowToast(true);
                      // navigate(path.cart)
                      openCart();
                    }
                  }
                }
              >
                <span>Thêm vào giỏ hàng</span>
              </div>

              <button
                className="bg-[#fe662b] text-white font-semibold  w-[49%]  "
                onClick={() => navigate(path.cart)}
              >
                Mua ngay
              </button>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-300" />
          <div className="flex justify-between">
            <span className="font-semibold text-sm">
              Mã : <span className="font-normal">{inforShoe?.id}</span>{" "}
            </span>
            <span className="font-semibold text-sm">
              Danh mục :{" "}
              <span className="font-normal">{inforShoe?.category?.name}</span>{" "}
            </span>
            <span className="font-semibold text-sm">
              Thương hiệu :{" "}
              <span className="font-normal">{inforShoe?.brand?.name}</span>{" "}
            </span>
          </div>
          <div className="h-8">
            {!!amountShoe && (
              <span className="font-semibold text-sm">
                Số lượng hàng có sẵn :{" "}
                <span className="font-normal">{amountShoe}</span>{" "}
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
    </div>
  );
};

export default ProductItem;
