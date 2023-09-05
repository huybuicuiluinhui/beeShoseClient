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
    {
      img: Images.iconLogoNike,
      name: "Nike",
    },

    {
      img: Images.iconAdidas,
      name: "Adidas",
    },
    {
      img: Images.iconJordan,
      name: "Jordan",
    },
    {
      img: Images.iconLogoNike,
      name: "Nike",
    },

    {
      img: Images.iconAdidas,
      name: "Adidas",
    },
    {
      img: Images.iconJordan,
      name: "Jordan",
    },
    {
      img: Images.iconLogoNike,
      name: "Nike",
    },

    {
      img: Images.iconAdidas,
      name: "Adidas",
    },
    {
      img: Images.iconJordan,
      name: "Jordan",
    },
  ];
  return (
    <div className="w-full ">
      <Slider {...settings}>
        {dataBrand.map((item, index) => {
          return (
            <div
              className="cursor-pointer flex flex-col w-full items-center justify-center my-3 mb-2 h-auto group relative "
              key={index}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-56">
                <img
                  src={item.img}
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
