const path = {
  login: "/api/",
  logout: "/api/logout",
  home: "/",
  shop: "/shop",
  profile: "/profile",
  community: "/community",
  cart: "/cart",
  product: "/product/:id",
  listProductsByBrand: "/brand/:idBrand/:nameBrand",
  listProductsByCategory: "/category/:idCategory/:nameCategory",
  listProductsByBrandWithSearch: "/search/:category",
  payment: "/payment",
  invoice: "/invoice",
  information: "/information",
  detailOrder: "/detailOrder",
  addAddress: "/addAddress",
  returnProduct: "/returnProduct",
  detailReturn: "/detailReturn",
  lookUpOrders: "/lookUpOrders",
  loginScreen: "/loginScreen",
} as const;
export default path;
