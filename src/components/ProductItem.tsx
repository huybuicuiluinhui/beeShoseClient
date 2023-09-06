import React, { useState } from "react";
import { ProductType } from "../types/product.type";
import { useNavigate } from "react-router-dom";
import path from "../constants/path";
interface ProductItemProps {
  product: ProductType;
}
const ProductItem =
  //: React.FC<ProductItemProps>
  (
    {
      // product
    }
  ) => {
    const navigate = useNavigate();
    const [images, setImages] = useState({
      img1: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
      img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
      img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
      img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    });

    const [activeImg, setActiveImage] = useState(images.img1);

    const [amount, setAmount] = useState(1);
    const [dataSize, setDataSize] = useState([
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
    ]);

    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-row gap-3 lg:w-3/4">
            <div className="flex flex-col  h-auto  justify-between ">
              <img
                src={images.img1}
                alt="123"
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img1)}
              />
              <img
                src={images.img2}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img2)}
              />
              <img
                src={images.img3}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img3)}
              />
              <img
                src={images.img4}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img4)}
              />
            </div>
            <img
              src={activeImg}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span className=" text-violet-600 font-semibold">
                Hãng giày Nike
              </span>
              <h1 className="text-3xl font-thin">
                Giày Air Jordan 1 Low GS ‘Rabbit’ DZ6333 083
              </h1>
            </div>
            <p className="text-gray-700"></p>
            <h6 className="text-base font-bold">Giá: 3.000.000đ</h6>
            <div className="flex">
              <span>Size:</span>
              <div className="flex items-center w-full flex-wrap">
                {dataSize &&
                  dataSize.map((e, i) => {
                    return (
                      <div className="px-1 py-[2px] mx-2 border-solid border-2 border-[#dcdcdc] mb-1 ">
                        {e}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex flex-row items-center gap-12">
              <span>Số lượng</span>
              <div className="flex flex-row items-center">
                <button
                  className="w-8 "
                  onClick={() => setAmount((prev) => prev - 1)}
                >
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD5UlEQVR4nO1aOW8UMRT+EFdQEHeAEsqICPgTQLiPLgG6RNBAVkDLUQNVpEj8hi2BbMaekBESII5wNSQhUHEUCOgIIEAfsv0yGbHXzGZ2dzbiSZZW++znz37P9jsG+E8LlOhhHT0cocI1KgxTY5IaX6nxU5r5PWF5po+Pw7yNtcgCMUAbNU5SQ1PjDzWYsP2mhqLCCRawvPELeIAV1DhPjY8RUD+oMUaFi1YzGp1mxzmOpbaZ3+Y/x7tEhUDGuPEKH6hwzmxOYxbhYz8V3kYAPKFGH32sTiwrwBpq9FNjPCLvDRX21tuMbkQ08JQKu1OT76ObGs8j8odS1w4DbLbA3QTf6OMM81ic6iRmnjwWU2OACjOhtkexKR3hClutut0izK3TlYrgSnOOYjsVpmTOaYNhfgIL6AgFKjxmgA2poa029217OdyTud8aq5jPmXDmpPCACu2po62GQaGdGg9DM6vlzEQO9oR57OqCNA4OH+sjZjaUdPD+8GA34EzEPDMzFpOP7viP3ew74eMMMkLUyIWHP46JUeNC+E7U4YqtlRhgCTVeCLZc5c4FLLeugunsYRcyRtTYJwv5WFEr1nmTGwIZJBKLwpvUR2/5jgq+rLgPGSUqnJLNHikfTzi3+kctDmCDH8qfVPhVEicVjoo27iDjRI27opWDxUyF68K8iIwTFa7Ipl8txRwW5iFknDhnPTdLMV8LsxMZJ45gm2CdLGZqfJH3o2l+VVwyXrgs5FMx02U6yDyWVRWUPMmQqKHa/ObhljzBgl7Il5YxrQI6ypvWgjnsSq5fH4eRcaLGsUrXr3sQNS6hpR9Ez2YADXMMreKieDhQzhlzTmOANcgo0Tm3zmksYFXpTiah7LTSj4wSNU6LTzhcvpOH47KQcWQ1sFJ4Jhh7qoW676XjHmSM6OGAYHtXtQxhU/tOdc8yl3xQeCnYzsYZ0BbJ9Q4gI8S5DZ6KXRQy9QkZNGOSY3VHWR3PTip8F0zJShm2PjG7Az7W1w1lPL9qWrAMJhfgTOyJmNjDpiSxA6ykxiPB8KjmOqPsxmRYViigI3W0lR+++2E5br4FH1vomVPtFD3sSA1t+Tl3RuZ8zRFsSUfwKDaFZuay4jlzHaYivPiKPRcebGNOChvTnqQtvABce5FW9dW+2K5a/DJS3R2sa+1dqq/T/1R3T9XyFYOcg9MRt4PWlFKsFsfRTi7izlBifuNeX7Z5JxPFmWpTHstsc5WnLgmKLktflyeYdTsUzjbnCwjjm/noNQllCQGSJRqMK+4i056mLKAUmYSyycWaqI0at6SU/Tn8qMb8VnhlwlPbx/QtF0/8J7Q+/QUDyJbeajfx9gAAAABJRU5ErkJggg==" />
                </button>
                <span className="py-4 px-2 rounded-lg">{amount}</span>
                <button
                  className="w-8"
                  onClick={() => setAmount((prev) => prev + 1)}
                >
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD+0lEQVR4nO1aS08UQRD+DCoYjSKKeNQj0Sh/wvcTb6DeIHhRN+hV9KyeSEz8DXv0sUz1oBNBCQgiXARETyoHI95EjJoy3V07THBnX/TCrLGSSTbbPVVfdVdX12OA//SPEntoYA9nmXCHCY9ZYZoVvrLCD3n07ykzpuf4OMOPsB1JIA5QxwoXWUGxwm9W4BKfX6xATLjAGdSuvgJD2MQK11hhLgJqkRWeMuGG2RmFZr3iPIYN5tG/9X92rIcJgbxj3yd8YkK3XpzVUcLHCSa8jwAYZYUO9rGtZF4B6lmhkxXGIvzeMeFYpc3ofmQHXjHhsDP+Po6ywusI/3vOd4cD7DbArYBv7OMyp1HjVIiWk0YNK1xlwkK42/1ocsOcsNdst1VCe539Thjnk9mPA0yYEZmzGsPKGGbQGDIkvOQAO52hLST7kXEOz0X2e20VKzkT1pwIQ0zY7BxtIQyEzawwHJpZOWcmcrCn9GVXEaTF4PCxI2Jm90p9+UR4sFfhTBR5ZhYMJh9Hi7/ssveEj8tICLFCKjz8xZgYK1wP74kKuNhyiQOsZ4UJwZbKPzmDWhMq6MkeDiFhxArHRZG5vLtigjfxEEggMWNd6El9tMdPtFGs1rjDmXDtPglDzvgRumSx++LzCRtWL5YTAMYKltjJ8UX5gwk/c+JkQqsIfeJKaCUU0cQKz2RXTmE5MeGuDN5A0hUh3BK+t3MNPpbB01WgSKvwfZBr8K0MNidekT7sE77TuQTOy/3RkHhFAuwUvp9zCdSVDuY0NpbMmDBYRuEhm9oOliwvg9psnSA5iigMuFZkvmpMK4PGeNP6Zw47ifv1caYKLsRz+dyvvRAVeqr7QvRMBVAPPq2aEMXDybhgzAaNAeoTGzR6Jri1QWMGW+OEkgjudCbYuuYBZ/wULgnGTPwkD+dl0hiSmlgRxgVjW6FU96NMPIKEEXs4Kdg+FGxDmNK+DR3GE1d8IEwKtivFvFAXqfVeRUKIlxZ4puimkO5PyEsLujhWcZSF8bQw4btgKq2VYfoT2RXwsaNiKIuLq2YFS2/pDKyJjYqJDa9JETvAFlYYEQwjZfcZZTWmw7ZCBo3O0ea/+F6E7biVNnxMo2dpa2fYw0FnaONltkRkvuU+7HHDuB9NoZnZqnhKu0MnzP92sd3hwdbmRNjlWkhd6ADsM+Gq+2pubNstnoykwL0V7b1L93V2WXe3q5yvGOQcXIqEHWxMyWG3uJjdSUXCGZacX4fXN03dSWdxutuUxkbz2M7TfkmKbspcWyfIhh2EK2vzBYSOzXy064KypAClVlB+SmbatiYK5CJdUNa1WJ21scJDaWV/CT+q0b8Jb3R6aubouXH5xH9C9dMfKIO1odr18XMAAAAASUVORK5CYII=" />
                </button>
              </div>
              <button
                className="bg-[#FFBA00] text-white font-semibold py-3 px-5 rounded-xl h-full "
                onClick={() => navigate(path.cart)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ProductItem;
