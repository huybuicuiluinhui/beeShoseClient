import React from "react";
import Images from "../static";
import Slider from "react-slick";

const SliderListBrand = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  const dataBrand = [
    Images.iconLogoNike,
    Images.iconLogoNike,
    Images.iconLogoNike,
    Images.iconLogoNike,
    Images.iconLogoNike,
    Images.iconLogoNike,
    Images.iconLogoNike,
    Images.iconLogoNike,
    Images.iconLogoNike,
    Images.iconLogoNike,
  ];
  return (
    <div className="w-full ">
      <Slider {...settings}>
        {dataBrand.map((item, index) => {
          return (
            <div
              className="flex flex-col w-full items-center justify-center my-3 "
              key={index}
            >
              <img
                src={item}
                className="w-[200px] h-auto object-contain mx-auto"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderListBrand;
