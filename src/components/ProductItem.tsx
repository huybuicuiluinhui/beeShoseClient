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
    const [dataSize, setDataSize] = useState(["31", "32", "33", "34"]);

    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={activeImg}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-row justify-between h-24">
              <img
                src={images.img1}
                alt=""
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
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span className=" text-violet-600 font-semibold">
                Hãng giày Nike
              </span>
              <h1 className="text-3xl font-bold">Giày adidas </h1>
            </div>
            <p className="text-gray-700">
              Con un'ammortizzazione incredibile per sostenerti in tutti i tuoi
              chilometri, Invincible 3 offre un livello di comfort elevatissimo
              sotto il piede per aiutarti a dare il massimo oggi, domani e
              oltre. Questo modello incredibilmente elastico e sostenitivo, è
              pensato per dare il massimo lungo il tuo percorso preferito e fare
              ritorno a casa carico di energia, in attesa della prossima corsa.
            </p>
            <h6 className="text-2xl font-semibold">Giá: 0đ</h6>
            <div className="flex items-center">
              <span>Size:</span>
              {dataSize &&
                dataSize.map((e, i) => {
                  return (
                    <div className="px-2 py-1 mx-2 border-solid border-2 border-[#dcdcdc]">
                      {e}
                    </div>
                  );
                })}
            </div>
            <div className="flex flex-row items-center gap-12">
              <span>Số lượng</span>
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount((prev) => prev - 1)}
                >
                  -
                </button>
                <span className="py-4 px-6 rounded-lg">{amount}</span>
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-violet-800 text-white font-semibold py-3 px-10 rounded-xl h-full"
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
