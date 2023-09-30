import React from "react";
import { IProduct } from "../types/product.type";
import { convertToCurrencyString, renderColor } from "../utils/format";
const ProductStanding = ({ product }: { product: IProduct }) => {
  const imageArray = product.images ? product.images.split(",") : [];
  const firstImageUrl = imageArray[0];
  return (
    <div className="border-[1px] py-4 px-4 relative h-[300px] group btn4 leading-none overflow-hidden">
      <p className="text-black text-xs bg-[#fbda00] rounded-md font-medium px-1  absolute top-[2%] left-[2%] z-[8]">
        Trả góp 0%
      </p>
      <div className="hover-translate-up">
        <div className="min-h-[110px] max-h-[170px] flex flex-col gap-2">
          <img
            src={firstImageUrl}
            className="max-h-[170px] w-full  object-contain mx-auto "
          />
        </div>
        <p className="text-[#282828] text-sm text-center mt-4 group-hover:text-[#FFBA00] line-clamp-1">
          {product.name}
        </p>
        <div className="flex items-center justify-between ">
          <p className="text-red-500 font-bold text-sm   ">
            {convertToCurrencyString(product.minPrice)}-{" "}
            {convertToCurrencyString(product.maxPrice)}
          </p>
          {/* <p className="line-through text-gray-400 font-semibold text-sm "></p> */}
        </div>
        <p className=" text-gray-400 font-thin text-sm  line-clamp-1">
          <span className="text-slate-800 font-bold">Màu sắc</span>:{" "}
          {renderColor(product)}
        </p>
        <p className=" text-gray-400 font-thin text-sm  line-clamp-1 ">
          <span className="text-slate-800 font-bold">Danh mục:</span>
          {product?.category}
        </p>
      </div>
      <span
        className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#FFBA00]  `}
      />
    </div>
  );
};
export default ProductStanding;
