import React from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../../static";
type ItemProps = {
  name: string;
  price: number;
  color: string;
  quantity: number;
};

const InvoiceAll = () => {
  const navigate = useNavigate();
  const items = [
    {
      name: "Giày Sneakers Nam BELSPORTS HJ06 - BSN020",
      price: 200000,
      color: "SkyBlue",
      quantity: 1,
    },
    {
      name: "Giày Sneakers Nam BELSPORTS HJ06 - BSN020",
      price: 200000,
      color: "SkyBlue",
      quantity: 1,
    },
    {
      name: "Giày Sneakers Nam BELSPORTS HJ06 - BSN020",
      price: 200000,
      color: "SkyBlue",
      quantity: 1,
    },
  ];

  const Item: React.FC<ItemProps> = ({ name, price, color, quantity }) => {
    return (
      <div className="flex justify-between items-center p-2 border-b">
        <img src={Images.giay01} className="w-[110px] h-auto" />
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-gray-500">{color}</div>
        </div>
        <div>
          <div className="text-sm">
            {quantity} x {price.toLocaleString()} VND
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
        <div className="w-full bg-red-500 text-end text-white px-4 py-1">
          HOÀN THÀNH
        </div>
        {items.map((item, index) => (
          <Item key={index} {...item} />
        ))}
        <div className="p-4 self-end">
          <div className="font-semibold text-sm">
            Thành tiền:{" "}
            <span className="text-red-600">
              {items
                .reduce((total, item) => total + item.price * item.quantity, 0)

                .toLocaleString()}
              VND
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceAll;
