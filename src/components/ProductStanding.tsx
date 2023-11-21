import React, { useState } from "react";
import { IProduct } from "../types/product.type";
import { convertToCurrencyString, renderColor } from "../utils/format";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Images from "../static";

const ProductStanding = ({ product }: { product: IProduct }) => {
  const imageArray = product.images ? product.images.split(",") : [];
  const firstImageUrl = imageArray[0];
  return product.minPrice && product.maxPrice && product.quantity ? (
    <div className="border-[1px] py-4 px-4 relative h-[300px] group btn4 leading-none overflow-hidden">
      <p className=" text-xs bg-red-500 rounded-md font-medium  absolute top-[2%] left-[2%] z-[8] text-white px-2 py-1">
        Trả góp 0%
      </p>
      <div className="hover-translate-up">
        <div
          className={`min-h-[110px] max-h-[170px] flex flex-col gap-2
          
        `}
        >
          <LazyLoadImage
            src={firstImageUrl ? firstImageUrl : Images.imgNotFound}
            className="max-h-[170px] w-full  object-contain mx-auto"
          />
        </div>
        <p className="text-[#282828] font-medium text-xs text-center mt-4  line-clamp-1">
          {product.name}
        </p>
        <div className="flex items-center justify-between ">
          <p className="text-red-500 font-semibold text-base   ">
            {convertToCurrencyString(product.minPrice)}-{" "}
            {convertToCurrencyString(product.maxPrice)}
          </p>
        </div>
        <p className=" text-gray-400 font-thin text-sm  line-clamp-1">
          <span className="text-slate-800 font-bold">Màu sắc</span>:{" "}
          {product.color}
        </p>
        <p className=" text-gray-400 font-thin text-sm  line-clamp-1 ">
          <span className="text-slate-800 font-bold">Danh mục:</span>
          {product?.category}
        </p>
      </div>
      <span className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#000]  `} />
    </div>
  ) : (
    <div className="border-[1px] py-4 px-4 relative h-[300px] group btn4 leading-none overflow-hidden">
      <div className="hover-translate-up">
        <div
          className={`min-h-[110px] max-h-[170px] flex flex-col gap-2
        
      `}
        >
          <LazyLoadImage
            src={Images.imgNotFound}
            className="max-h-[170px] w-full  object-contain mx-auto"
          />
        </div>
      </div>
      <span className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#000]  `} />
    </div>
  );
};
export default ProductStanding;
