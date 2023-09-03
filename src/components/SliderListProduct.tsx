import React from "react";
import Slider, { Settings } from "react-slick";
import dataProduct from "../constants/data";
import { useNavigate } from "react-router-dom";
import path from "../constants/path";
const SliderListProduct = () => {
  const navigate = useNavigate();
  const settings: Settings = {
    dots: false,
    arrows: false,
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  const sliderRef = React.useRef<Slider>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="w-full flex px-4">
      <button onClick={() => prev()}>
        <a
          href="#pablo"
          className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-[#FFBA00] text-white "
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8UlEQVR4nOWRMUoDQRSGPzYQk9PkBpLKOpZpcpV0mktoZ7NdLNZ5s0oKDyAeQrTzCL9kEiVrYFn27UIgD36YYvi+ef/AWY4KLmSsZHzus1LOsDt4pFBElRi3fnjOUJHHI/hO8NUfPCbBR/e1xEpu+oQX23vd1xJTNUEbRm3gY5W89vLyJDDue4PvBd81cGtVSyOB8a4XrpQz8ArujuAlbwosFJnrialE1l6wYSTjIW2yy/oP/hu3ZEkm47IC/Z+SqasuiSy9tE7i3kQNJIFJa0GjuoxrvKM6SWDmFtTW5a2Ig0mSwETPzFK256Xjk096fgAwQ6gwRtuJBwAAAABJRU5ErkJggg==" />{" "}
        </a>
      </button>
      <div className="w-[95%] mx-auto ">
        <Slider {...settings} ref={sliderRef}>
          {dataProduct.map((product, index) => {
            return (
              <div
                key={product.id}
                className="group relative px-5 "
                onClick={() => {
                  navigate(path.product);
                }}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-56">
                  <div className="relative h-full w-full">
                    <span className="text-black text-sm bg-[#fbda00] rounded-md  absolute top-[2%] left-[2%] font-medium px-1">
                      Trả góp 0%
                    </span>
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-[80%] object-contain  object-center lg:h-full lg:w-full"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <button
        onClick={() => {
          next();
        }}
      >
        <a
          href="#pablo"
          className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-[#FFBA00] text-white "
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8ElEQVR4nN2TQWrCUBRFDylUuxp3UARX0KETt+JQF2GnHWRoIf3/hdKB49Jd6Ehcwi3/KwXbEGx8GbQPLrxBcs7/lwT+7WhOoVdGijzkpF0UfoIENKZneWHsJsmntm+ClJqxSm76E5iTRKGhInOsK72cIb1K5hSK3LdKrq1LTTcJzBRYK3LICTzpjaGPJDBTzYcMnSXy2FnwVVfFRMb7D/hRcOCaUcmtIs+N8GP23eEVAxlVCzxl1R+8ZqOSu261GOtWeCR0+oIurKVKz/0angWRZW/wk2DnXstFgugAPwkW7rU0/FgLGductHvB/9R8Ak7IqHyXw1GoAAAAAElFTkSuQmCC" />
        </a>
      </button>
    </div>
  );
};

export default SliderListProduct;
