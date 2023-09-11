import React from "react";
import "./App.css";
import {
  Routes,
  Route,
  RouteObject,
  NavLink,
  useRoutes,
} from "react-router-dom";
import HomePage from "./pages/home/index";
import ProductPage from "./pages/product/index";
import path from "./constants/path";
import Header from "./components/Header";
import ListProductsByBrand from "./pages/listProductsByBrand";
import ScrollToTopButton from "./components/scrollToTop";
import CartPage from "./pages/cart";
import PaymentPage from "./pages/payment";
import Invoice from "./pages/invoice";
import Footer from "./components/Footer";
import Information from "./pages/information";
import DetailOrder from "./pages/information/detailOrder";
import AddAddress from "./pages/information/addAddress";
import ReturnProduct from "./pages/information/returnProduct";
import DetailReturn from "./pages/information/returnProduct/detailReturn";

function App() {
  let routes: RouteObject[] = [
    {
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: path.listProductsByBrand,
          element: <ListProductsByBrand />,
          children: [{ index: true, element: <ProductPage /> }],
        },
        { path: path.product, element: <ProductPage /> },
        { path: path.cart, element: <CartPage /> },
        { path: path.payment, element: <PaymentPage /> },
        { path: path.invoice, element: <Invoice /> },
        { path: path.information, element: <Information /> },
        { path: path.detailOrder, element: <DetailOrder /> },
        { path: path.addAddress, element: <AddAddress /> },
        { path: path.addAddress, element: <ReturnProduct /> },
        { path: path.detailReturn, element: <DetailReturn /> },
      ],
    },
  ];
  let element = useRoutes(routes);

  return (
    <div className="bg-white min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4  ">
        <Header />
        <div className="w-full  flex flex-col flex-1 ">{element}</div>
        <ScrollToTopButton />
        <Footer />
      </div>
    </div>
  );
}

export default App;
