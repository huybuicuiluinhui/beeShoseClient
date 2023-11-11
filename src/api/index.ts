export const baseUrl = "http://localhost:8080/";
const API = {
  // thương hiệu
  getBrand: () => baseUrl + "api/brand",
  getBrandChoose: (id: number, page: number, sizePage: number) =>
    baseUrl + `api/shoe?brand=${id}&page=${page}&sizePage=${sizePage}`,
  getBrandAllPage: (page: number, sizePage: number) =>
    baseUrl + `api/brand?page=${page}&sizePage=${sizePage}`,

  // size
  getSize: () => baseUrl + `api/size`,
  getSizeAll: () => baseUrl + `api/size?page=1&sizePage=1000000`,
  getSizePage: (page: number) => baseUrl + `api/size?page=${page}`,
  //
  getColor: () => baseUrl + `api/color`,
  getColorPage: (page: number) => baseUrl + `api/color?page=${page}`,
  getAllColors: () => baseUrl + `api/color?page=1&sizePage=100000`,

  // Danh mục
  getSole: () => baseUrl + "api/sole",
  getSoleChoose: (sole: number, page: number, sizePage: number) =>
    baseUrl + `api/shoe?sole=${sole}&page=${page}&sizePage=${sizePage}`,
  // sản phẩm
  getShoe: (page: number, sizePage: number) =>
    baseUrl + `api/shoe?page=${page}&sizePage=${sizePage}`,
  getShoesImg: () => baseUrl + "api/images",
  getShoeDetail: (shoe: number) => baseUrl + `api/shoe-detail?shoe=${shoe}`,
  getAllShoeDetail: () => baseUrl + `api/shoe-detail?sizePage=100000`,
  getShoeWithId: (shoe: number) => baseUrl + `api/shoe/${shoe}`,
  getShoeDetailWithId: (id: number) => baseUrl + `api/shoe-detail/${id}`,
  getCategory: () => baseUrl + "api/category?sizePage=100",
  getAllShoe: (page: number, sizePage: number) =>
    baseUrl + `api/shoe?page=${page}&sizePage=${sizePage}`,
  getShoeWithCategory: (id: number, page: number, sizePage: number) =>
    baseUrl + `api/shoe?page=${page}&sizePage=${sizePage}&category=${id}`,
  // lấy giá theo chi tiết sản phẩm
  getPriceDetailShoe: (name: string, size: number, color: number) =>
    baseUrl +
    `api/shoe-detail?name=${name}&size=${size}&color=${color}&sizePage=100000`,
  // Lấy danh sách voucher
  getVoucher: () => baseUrl + `api/voucher?sizePage=100000`,
  getShoeSearch: (name: string, page: number) =>
    baseUrl + `api/shoe?name=${name}&page=${page}&sizePage=20`,
};
export default API;
