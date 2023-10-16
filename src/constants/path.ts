const path = {
  login: "/api/login-zalo-miniapp",
  logout: "/api/logout",
  home: "/",
  shop: "/shop",
  profile: "/profile",
  community: "/community",
  cart: "/cart",
  product: "/product/:id",
  listProductsByBrand: "/:category",
  payment: "/payment",
  invoice: "/invoice",
  information: "/information",
  detailOrder: "/detailOrder",
  addAddress: "/addAddress",
  returnProduct: "/returnProduct",
  detailReturn: "/detailReturn",
} as const;
export default path;
