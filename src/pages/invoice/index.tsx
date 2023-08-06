import React from "react";
import InvoiceAll from "./invoiceAll";
import WaitForPay from "./waitForPay";
import Transport from "./transport";
import Delivering from "./delivering";
import Complete from "./complete";
import Cancelled from "./cancelled";
import Return from "./return";
const Invoice = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const _invoiceAll = React.useMemo(() => <InvoiceAll />, []);
  const _waitForPay = React.useMemo(() => <WaitForPay />, []);
  const _transport = React.useMemo(() => <Transport />, []);
  const _delivering = React.useMemo(() => <Delivering />, []);
  const _complete = React.useMemo(() => <Complete />, []);
  const _cancelled = React.useMemo(() => <Cancelled />, []);
  const _return = React.useMemo(() => <Return />, []);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-7">
        {/* Tab buttons */}
        <button
          className={`px-4 py-2  ${
            activeTab === 0
              ? "text-[#333]  font-bold text-base border-b-2  border-[#f11a28] border-solid"
              : "text-[#333]  font-bold text-base  "
          }`}
          onClick={() => handleTabClick(0)}
        >
          Tất cả
        </button>
        <button
          className={`px-4 py-2  ${
            activeTab === 1
              ? "text-[#333]  font-bold text-base border-b-2  border-[#f11a28] border-solid"
              : "text-[#333]  font-bold text-base  "
          }`}
          onClick={() => handleTabClick(1)}
        >
          Chờ thanh toán
        </button>
        <button
          className={`px-4 py-2  ${
            activeTab === 2
              ? "text-[#333]  font-bold text-base border-b-2  border-[#f11a28] border-solid"
              : "text-[#333]  font-bold text-base  "
          }`}
          onClick={() => handleTabClick(2)}
        >
          Vận chuyển
        </button>
        <button
          className={`px-4 py-2  ${
            activeTab === 3
              ? "text-[#333]  font-bold text-base border-b-2  border-[#f11a28] border-solid"
              : "text-[#333]  font-bold text-base  "
          }`}
          onClick={() => handleTabClick(3)}
        >
          Đang giao
        </button>
        <button
          className={`px-4 py-2  ${
            activeTab === 4
              ? "text-[#333]  font-bold text-base border-b-2  border-[#f11a28] border-solid"
              : "text-[#333]  font-bold text-base  "
          }`}
          onClick={() => handleTabClick(4)}
        >
          Hoàn thành
        </button>
        <button
          className={`px-4 py-2  ${
            activeTab === 5
              ? "text-[#333]  font-bold text-base border-b-2  border-[#f11a28] border-solid"
              : "text-[#333]  font-bold text-base  "
          }`}
          onClick={() => handleTabClick(5)}
        >
          Đã hủy
        </button>
        <button
          className={`px-4 py-2  ${
            activeTab === 6
              ? "text-[#333]  font-bold text-base border-b-2  border-[#f11a28] border-solid"
              : "text-[#333]  font-bold text-base  "
          }`}
          onClick={() => handleTabClick(6)}
        >
          Trả hàng/Hoàn tiền
        </button>
      </div>
      <div className="w-full">
        {activeTab === 0 && _invoiceAll}
        {activeTab === 1 && _waitForPay}
        {activeTab === 2 && _transport}
        {activeTab === 3 && _delivering}
        {activeTab === 4 && _complete}
        {activeTab === 5 && _cancelled}
        {activeTab === 6 && _return}
      </div>
    </div>
  );
};

export default Invoice;
