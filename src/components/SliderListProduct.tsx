import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import { useNavigate } from "react-router-dom";
import path from "../constants/path";
import { convertToCurrencyString, renderColor, toSlug } from "../utils/format";
import axios from "axios";
import API from "../api";
import { IProduct } from "../types/product.type";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
const SliderListProduct = ({ products }: { products: IProduct[] }) => {
  const navigate = useNavigate();
  const settings: Settings = {
    dots: false,
    arrows: false,
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
  };
  console.log(products);
  const sliderRef = React.useRef<Slider>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const imgArr = [];
  for (let i = 0; i < products.length; i++) {
    imgArr.push(products[i].images ? products[i].images.split(",") : []);
  }
  const prev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  return (
    <div className="w-full flex px-4 my-2 mb-5 ">
      <button onClick={() => prev()}>
        <a className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-[#FFBA00] text-white ">
          <LazyLoadImage src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8UlEQVR4nOWRMUoDQRSGPzYQk9PkBpLKOpZpcpV0mktoZ7NdLNZ5s0oKDyAeQrTzCL9kEiVrYFn27UIgD36YYvi+ef/AWY4KLmSsZHzus1LOsDt4pFBElRi3fnjOUJHHI/hO8NUfPCbBR/e1xEpu+oQX23vd1xJTNUEbRm3gY5W89vLyJDDue4PvBd81cGtVSyOB8a4XrpQz8ArujuAlbwosFJnrialE1l6wYSTjIW2yy/oP/hu3ZEkm47IC/Z+SqasuiSy9tE7i3kQNJIFJa0GjuoxrvKM6SWDmFtTW5a2Ig0mSwETPzFK256Xjk096fgAwQ6gwRtuJBwAAAABJRU5ErkJggg==" />{" "}
        </a>
      </button>
      <div className="w-[95%] mx-auto ">
        <Slider {...settings} ref={sliderRef}>
          {products.map((item, index) => {
            if (!!item.images) {
              return (
                <div
                  key={index}
                  className="group relative px-5  "
                  onClick={() => {
                    navigate(`/product/${item.id}`, {
                      state: item.id,
                    });
                  }}
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-56">
                    <div className="relative h-full w-full">
                      <span className="text-black text-sm bg-[#fbda00] rounded-md  absolute top-[2%] left-[2%] font-medium px-1">
                        {/* Trả góp 0% */}
                      </span>
                      <LazyLoadImage
                        src={item.images.split(",")[0]}
                        className="h-full w-[80%] object-center  object-cover lg:h-full lg:w-full"
                      />
                    </div>
                  </div>
                  <div className="mt-4  ">
                    <h3 className="text-sm text-gray-700 group-hover:font-semibold   line-clamp-1 ">
                      <span aria-hidden="true" className="absolute inset-0  " />
                      {item.name}
                    </h3>
                    <span className=" text-sm text-gray-500">
                      {renderColor(item)}
                    </span>
                    <div className="">
                      <p className="text-sm font-medium text-red-500  ">
                        {convertToCurrencyString(item.minPrice)}-
                        {convertToCurrencyString(item.maxPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </Slider>
      </div>
      <button
        onClick={() => {
          next();
        }}
      >
        <a className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-[#FFBA00] text-white ">
          <LazyLoadImage src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8ElEQVR4nN2TQWrCUBRFDylUuxp3UARX0KETt+JQF2GnHWRoIf3/hdKB49Jd6Ehcwi3/KwXbEGx8GbQPLrxBcs7/lwT+7WhOoVdGijzkpF0UfoIENKZneWHsJsmntm+ClJqxSm76E5iTRKGhInOsK72cIb1K5hSK3LdKrq1LTTcJzBRYK3LICTzpjaGPJDBTzYcMnSXy2FnwVVfFRMb7D/hRcOCaUcmtIs+N8GP23eEVAxlVCzxl1R+8ZqOSu261GOtWeCR0+oIurKVKz/0angWRZW/wk2DnXstFgugAPwkW7rU0/FgLGductHvB/9R8Ak7IqHyXw1GoAAAAAElFTkSuQmCC" />
        </a>
      </button>
    </div>
  );
};

export default SliderListProduct;
