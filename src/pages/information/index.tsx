import React, { useEffect, useState } from "react";
import Images from "../../static";
import InforMe from "./inforMe";
import Invoice from "../invoice";
import HistoryOrder from "./historyOrder";
import { useLocation } from "react-router-dom";
import Address from "./address";
import ReturnProduct from "./returnProduct";

const Information = () => {
  const dataAside = [
    {
      name: "Trang tài khoản",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8UlEQVR4nN3RzSrEURzG8c9sMIOahXELXuIiyNJCalLugsEWV0ApF0CSlOy4BKyUjbwUxR5ZsaCjs5j07+907Oapp07Pefqefr9DJ2gUi1jAyH9hK/jAdXQ4L+fCJvGJmbZsNmYTOcB9HBTkh9jLAZ5ioyDfxEkOcB03qLZlNdxhLQfYj3ucYT76ImZ9MjWIXbziBTto5MJqWMI53qPDufVrDUkaxi2esIrp6LC757jboTSUn5EecYTegvuQHeMBAynAbVyiu6TTgyts/QULkDc0Ex6eix/VVVYax1fiKI3YHSsr1TGFSgKwErv1hG4n6xsERy4ZpAjEKQAAAABJRU5ErkJggg==",
    },
    {
      name: "Đơn hàng",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZ0lEQVR4nGNgQAA5BgYGYzKxHAMWMIuBgWEdlCYFr4PSWA0E2UYqMB4QA6uJ8Go1KQZqEBERGgPq5RFo4BIoBoGzOPCSAU+H1UjiVEmHGkgaKE6HGtQ2sJraXiYFGNPVQKoWsFSpAgBhXU8TZP3i0AAAAABJRU5ErkJggg==",
    },
    {
      name: "Yêu cầu trả hàng",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjUlEQVR4nNXUMQrCQBCF4e8K6XMLL5DOOoWHSGlnY5RcQrygBzCdgsrCVkKWrKwYH7xqhp8Zdufxz6qxmnCoZemAZ8IP9DnAER2qCXexZ7bCFE2i3sSeYsAw5bEk8IS2JHCLGzafAnc4v/mCO9aLABZf+euPUmH46cceZ5zeNQfYxwBIhcNeporG13L0Aj8EOmU9tB8HAAAAAElFTkSuQmCC",
    },
    {
      name: "Địa chỉ",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABGUlEQVR4nNXQzyqEYRQG8J9kIQtbygo7YWHFSpK1LP0ZUrOZHZsJN+AiZikLiY1QYzULa27ABagJzUaJ9NWZTONL32s3Tz11znnOed7zHnodCzjDUzCL5/9rto8vXGA3eIlP7KWaLcVgKUfbDm0xxfAWJx35cLCNU9ykGL5hNeJRvOIFI1FbizzJsP3dCXwEx6NWikcK4xrnHfkMpjvyTLsqbsdKHH42R5sKbVki7mLTbmS1eqpZe5N3lP2gHLVMK4R+7KCKORyihclgFh+EVo3e/r8Mj9CML9UwgAbug42o1aKnGTO5GMQzKl31MTziIeJOVGImm/2FjXhxqOh9oreJ9TxxK25UT2QLm3mGfbHlcSKzmWy2R/ANegNLcSOaMcIAAAAASUVORK5CYII=",
    },
    {
      name: "Thoát",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjUlEQVR4nNXUMQrCQBCF4e8K6XMLL5DOOoWHSGlnY5RcQrygBzCdgsrCVkKWrKwYH7xqhp8Zdufxz6qxmnCoZemAZ8IP9DnAER2qCXexZ7bCFE2i3sSeYsAw5bEk8IS2JHCLGzafAnc4v/mCO9aLABZf+euPUmH46cceZ5zeNQfYxwBIhcNeporG13L0Aj8EOmU9tB8HAAAAAElFTkSuQmCC",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Trang tài khoản");
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <div className="w-full h-full bg-white flex relative pb-20">
      <aside
        id="logo-sidebar"
        className="sticky   left-0  w-64 transition-transform -translate-x-full sm:translate-x-0 mt-10  "
        aria-label="Sidebar"
      >
        <img
          src={Images.testAvatar}
          alt=""
          className="rounded-[100%] w-10 h-10 mb-2"
        />
        <p className="text-sm font-thin ">
          Xin chào
          <span className="font-bold text-[#FFBA00]"> userName</span>
        </p>
        <div className="h-full py-4 ">
          <div className="flex flex-col items-start justify-center  w-full ">
            {dataAside.map((item, index) => {
              return (
                <div
                  className="relative tracking-wider btn4 leading-none overflow-hidden mt-2 pb-2"
                  onClick={() => {
                    handleCategoryClick(item.name);
                  }}
                  key={index}
                >
                  <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-[#FFBA00]  " />
                  {/* <img src={item.img} />{" "} */}
                  <span
                    className={`font-normal ml-5 hover:text-[#FFBA00] my-2 ${
                      selectedCategory === item.name
                        ? "text-[#FFBA00]  "
                        : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
      <div className="w-full  mt-2">
        {selectedCategory === dataAside[0].name ? (
          <InforMe />
        ) : selectedCategory === dataAside[1].name ? (
          <HistoryOrder />
        ) : selectedCategory === dataAside[2].name ? (
          <ReturnProduct />
        ) : (
          <Address />
        )}
      </div>
    </div>
  );
};

export default Information;
