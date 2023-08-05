const path = {
  login: "/api/login-zalo-miniapp",
  logout: "/api/logout",
  home: "/",
  shop: "/shop",
  profile: "/profile",
  community: "/community",
  cart: "/cart",
  category: "/category",
  product: "/product",
  listProductsByBrand: "/danh-muc/:id",
  payment: "/payment",
} as const;
export default path;
