import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import axios from "axios";
import API from "../api";
import { Product } from "../types/product.type";
import Images from "../static";
const SliderListBrand = () => {
  const navigate = useNavigate();
  const [listBrandHeader, setListBrandHeader] = useState<Product[]>();
  const settings = {
    dots: false,
    infinite: true,
    speed: 2500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  const toSlug = (text: string) => {
    return slugify(text, {
      lower: true,
    });
  };
  const getDataBrand = async () => {
    const res = await axios({
      method: "get",
      url: API.getBrandAllPage(1, 1000000),
    });
    if (res.status) {
      setListBrandHeader(res.data?.data);
    }
  };
  useEffect(() => {
    getDataBrand();
  }, []);
  return (
    <div className="w-full ">
      <Slider {...settings}>
        {!!listBrandHeader &&
          listBrandHeader.length &&
          listBrandHeader.map((item, index) => {
            return (
              <div
                onClick={() => {
                  navigate(`${toSlug(item.name)}`, {
                    state: item,
                  });
                }}
                className="cursor-pointer flex flex-col w-full items-center justify-center my-3 mb-2 h-auto group relative "
                key={index}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-56">
                  <img
                    src={Images.iconAdidas}
                    className="w-[200px] h-[150px] object-contain mx-auto"
                  />
                  <p className="text-center font-semibold group-hover:text-[#FFBA00] ">
                    {item.name}
                  </p>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default SliderListBrand;
