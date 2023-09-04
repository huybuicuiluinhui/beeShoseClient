import React from "react";
import { ProductType } from "../types/product.type";
const ProductStanding = ({ product }: { product: ProductType }) => {
  return (
    <div className="border-[1px] py-4 px-4 relative h-[300px] group">
      <span className="text-black text-xs bg-[#fbda00] rounded-md font-medium px-1  absolute top-[2%] left-[2%]">
        Trả góp 0%
      </span>
      <div className="hover-translate-up">
        <div className="min-h-[110px]">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-auto w-[80%] object-contain object-center mx-auto mt-8 "
          />
        </div>
        <p className="text-[#282828] text-sm text-center mt-4 group-hover:text-[#FFBA00]">
          {product.name}
        </p>
        <p className="text-red-500 font-bold text-sm mt-6  ">
          {product.price}
          <span className="border-b border-black">đ</span>
        </p>
      </div>
    </div>
  );
};
export default ProductStanding;
