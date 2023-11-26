import React, { useEffect, useState } from "react";
import Images from "../../static";
import InforMe from "./inforMe";
import Invoice from "../invoice";
import HistoryOrder from "./historyOrder";
import { useLocation, useNavigate } from "react-router-dom";
import Address from "./address";
import ReturnProduct from "./returnProduct";
import { IDataAside } from "../../types/product.type";
import { deleteToken, deleteUserToken } from "../../helper/useCookie";
import path from "../../constants/path";
type IDataAsideOmit = Omit<IDataAside, "imgHover"> | IDataAside;
const Information = () => {
  const navigate = useNavigate();
  const [chooseTab, setChooseTab] = useState<number>(1);
  const dataAside: IDataAside[] = [
    {
      id: 1,
      name: "Tài khoản của tôi",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVR4nOXV24uNURgG8J8MjaYGhWimoSRKStQkOU0ykxzKKUU5RynmAqGUs5BjEYkc4oqc4kIyN5Qbf4UL9/4BtOpRu5m9Ne297zy1Wt/3vqv3+b738Cz+R4xAJ6bluenYhuc4i9N5XtOs4GPxFNur+E7hCRY0SvAWs2r4R2F0iKbUS9KHh4NsnViI43iHy+jBfg3gfAJvSB3OYS/mxl+CH8axRgt+Apdq+LvwDXsaIVmOH2nbahiHn1ihAfTjJtqwGx2xd+S9Lf5yrm4sw2O0JnBL7C15b41/qQZxBN01fGVGDmkCygzcq+Er9smahC24UzF0Zb+LtYPOXcHFeknKZA+kyC+yD8ReMCZp6096D6Zew8b0BH6fuZC9TPzmzNAbrMTIrNV4Hd+SfwWfivu4hldJ0aek6Ssm4WO6rB29eJTVE+0ravGhFsHOEPwt6o4QXc3wFe2agQOR/Dm4nb9oSUPMjBztq0awqYoWtVdI+vdBDdEX/ZpdYZ+XupQP2FiN5EEOlVosThp687Ulhb8qCr4uROuxtSLGLqxKBkp9hqDI+9Ea6wx+Z+9O8cfnOr6V+t3A9dgm5E4agiKG84exuiL95ea8kEusNMPE/GnprGc4WY2kHhTtepn0ls4qLb+oWcErURT5Cz4PHsQ/+nZWwSUOVrQAAAAASUVORK5CYII=",
    },
    {
      id: 2,
      name: "Đơn mua",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgUlEQVR4nO2UQQqAIBBF3xXa2kbwgF4h6hS1ETqBO68XgYsorEYGWuQDEUacN/6F0KjEAyswK6w197swABYdbO73jcQDSSmuVIprJyi9JNQcToWJR03JchONmkRKaBIJLS4RP4vLAT3Q5d0JaiKJyZfNoaF5UXuURKWvPr7NtcGZDTlhQ6jNuo6FAAAAAElFTkSuQmCC",
    },
    {
      id: 3,
      name: "Yêu cầu trả hàng",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBElEQVR4nO3US4hPYRgG8N/MoEFNGvJXFoaNUCywRHYol5oFC8qlJCkUxq2UELmNS2HjGimixl0RQrkMaWo2srCQy8rGUvRNr5ymc+Z/TFnx1Ok753yX53svz8N//EYNmjHTX8JkPMAVfMNNjO3tYX0xGpPQgApO434QPMUFvI5/hzGo7OFjcAZv8R0/sAH78QkfcB7PsAVDsA5fY6ya57ToYdywA2sxIeZacRLPg3gPNuMlVmI+NlYj2RfPcRxA/27zv0iOxHgKe9Ev5ucVkdREbq/GxuWRljy0Yive4SjWYEFmvpAk4QmmRKHPRjqGF5DMiAYYlUOyGC1FJDsxK95booNqc9aNw6OoRUOGJBX+GO6gqYhkWtxyfUSSR5BN7yK0x6FteIG5qiAV7iPOoU45DMS26MbBJfd0RVOWIItUm/dl7aUuumMHNoUgq2FkaGQVDlZbnMJ9HNpYEl1yN1RehKYgGB/pTurvEcmHZkcL3wiiVOCLEV0eruMehsb3tYK278KwcNSEOaHituiwEbjdw76OiCSNn8NWCm37RGZjStvuzHx7zp5K6KU5hDwR9ehTRFIJQ0yYHobYmSnsrW63T1p6hV1xgalK4lLkvj4EtjDSdTlSmBT9Jpz3S4gveVejP0BjRHMIS7EsvpMZiu5ZjRXhXQP0ErXRYdvDv8roxL+BnxgabXXypBZNAAAAAElFTkSuQmCC",
    },
    {
      id: 4,
      name: "Địa chỉ",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABoklEQVR4nM3Vu2sVURDH8Y9RUTBRi2hjsPBRCLGw9vU32IiVCL7qCEFMoTbiXyCCqKUG0U5EI6iNhali7wPBFIkWouCjEGVkVtbN3U3uZgu/sJydM3Pnd86c2XP5j9iPScziB97jNvZ1kXwVruI1TmIEq3M8hTe4knGtCYEHGKzxx/zDFGpdolcNAgVDeIu9WjCZJSrYiil8yTHsgtO41UZkNmtf8BhnsQ7nUqi8gGiGvvmONSX7c6l0Q2kXrMW3NiLROTtK9lTuIIQmKjvZmR3YN9FVh2vO5FHlTI7gfhuROMw7S4y9V2mSJbMZnzC8SNxwxm3Skps4v0jMRVy3DHZhDutr/BvSH3HLInZzqcZ3GTd0wBZ8wLbK/PacD39fxMp+lZ7nWIEzeJLvBdHOY/n+rPK7yNOTAbzDaA/fSkzjaNrH8CLnq4xmnsi3gIOYadjlbszjQI57GmJfZtwCrmFcMxP4mddLE+OZ7x/iIvxYuXV7MYALdaUoMZL5yhesQ3mwXfI08/7lLo53LHIi8/4hvuavlRbs6on/mI0dL743vwFlJ2cTAiiC5gAAAABJRU5ErkJggg==",
    },

    {
      id: 5,
      name: "Thoát",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQklEQVR4nOXVS0pcURDG8R/oQIlLyEQ7GwhOxAcoandEpxm4AHsk8YEgDkV0B5KZRHTiAhJnKroBcQfuwVac2HKgAk3TfW+8eiXgBzW4nLrnTz1OFR9N/fiGOjaxjCoG3uLyCo7QQLODPeAXvhQFbOARTzjDCqYxjEms4rIFtvBSwM/4+RojOb7jOEXtpREkwG98UoIqkaLrsgBJx1GDvBR10hy20SunTRtR5CLaiTSfZIFq4fSjIKQ3AJmgejjMZFw0he8ZtojbLNBWHH7tAvjc5UFmWfU9Iulpv6Aah+lll1aTftzhvCBk91+6SwzD5DhaADKPvTxA0lC8+Ju3GuPdtB7R/CkbtB+gFNFYju9EkSn8V2uRugS7iP0x27ZPrlr2SapJIQ3iMLqu2cHucRDT+9XqiyiWWnZ8+i5tHfyfegbdCmXLx2hOTwAAAABJRU5ErkJggg==",
    },
  ];
  const handleLogout = () => {
    deleteToken();
    deleteUserToken();
    sessionStorage.removeItem("idAccount");
    navigate(path.loginScreen);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(chooseTab);
  const [selectedCategory, setSelectedCategory] = useState("Tài khoản của tôi");
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <div className="w-full h-full bg-white flex relative  min-h-screen">
      <aside
        id="logo-sidebar"
        className="sticky   left-0  w-64 transition-transform -translate-x-full sm:translate-x-0 mt-10  "
        aria-label="Sidebar"
      >
        <div className="flex items-start">
          <img
            src={Images.testAvatar}
            alt=""
            className="rounded-[100%] w-10 h-10 mb-2"
          />
          <div className="ml-2">
            <p className="text-sm font-bold text-gray-800 ">
              userName
              <div className="font-thin text-gray-800 flex items-end">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABJklEQVR4nN3TvUoDURCG4cdIKjsLg16B1jbaaimxsLRIoygISW1nSGGhuYMUQiz0Jqy1y12kESzUFPEH5cAEljVkiVqIHyyHnZ3znu/MzPJHtI7Sb8FO8YErzP4U1sYAdTzg4rtOSwFLzjoRW50WuoQ9XOMez2jhBcfTQGdwhlf00UUNlfi+k4PWw3lq1Fgd4hFbE9yPoJ2o6fmkq/ZwolitcNaelDSPd6xlYgvYRTkTq4SzdtGp25GY3dwNJwk6Ui0aVSoCplrcZN738YbLcJo9JHW/UHdo5mBpdPJT0B8T/6K56NxGBpbWvKqRt6hAm5HYGAMrx5wl90/xPxfqCMOANcJpM2o6iO734qB07UIth8NhrOm5jUZVY6Sm1goO4vqppv9Qn6xsSHwtb9O6AAAAAElFTkSuQmCC" />{" "}
                sửa hồ sơ
              </div>
            </p>
          </div>
        </div>
        <div className="h-full py-4 ">
          <div className="flex flex-col items-start justify-center  w-full ">
            {dataAside.map((item, index) => {
              return (
                <div
                  className="relative tracking-wider  leading-none overflow-hidden mt-2 pb-2 w-[85%] cursor-pointer mb-2 "
                  onClick={() => {
                    handleCategoryClick(item.name);
                    setChooseTab(item.id);
                  }}
                  key={index}
                >
                  <div className=" flex items-end">
                    <img src={item.img} />{" "}
                    <span
                      className={` ml-2  text-gray-900 ${
                        selectedCategory === item.name
                          ? "font-semibold "
                          : "text-gray-500 font-normal"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
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
          <Invoice />
        ) : selectedCategory === dataAside[2].name ? (
          <ReturnProduct />
        ) : selectedCategory === dataAside[3].name ? (
          <Address />
        ) : (
          <>{handleLogout()}</>
        )}
      </div>
    </div>
  );
};

export default Information;
