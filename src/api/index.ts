export const baseUrl = "http://localhost:8080/";
const API = {
  // thương hiệu
  getBrand: () => baseUrl + "api/brand",
  getBrandChoose: (id: number, page: number, sizePage: number) =>
    baseUrl + `api/shoe?brand=${id}&page=${page}&sizePage=${sizePage}`,
  // size
  getSize: () => baseUrl + `api/size`,
  getSizePage: (page: number) => baseUrl + `api/size?page=${page}`,
  //
  getColor: () => baseUrl + `api/color`,
  getColorPage: (page: number) => baseUrl + `api/color?page=${page}`,

  // Danh mục
  getSole: () => baseUrl + "api/sole",
  getSoleChoose: (sole: number, page: number, sizePage: number) =>
    baseUrl + `api/shoe?sole=${sole}&page=${page}&sizePage=${sizePage}`,
  // sản phẩm
  getShoe: (page: number, sizePage: number) =>
    baseUrl + `api/shoe?page=${page}&sizePage=${sizePage}`,
  getShoesImg: () => baseUrl + "api/images",
  getShoeDetail: (shoe: number) => baseUrl + `api/shoe-detail?shoe=${shoe}`,
  getShoeWithId: (shoe: number) => baseUrl + `api/shoe/${shoe}`,
  getCategory: () => baseUrl + "api/category",
  // lấy giá theo chi tiết sản phẩm
  getPriceDetailShoe: (name: string, size: number, color: number) =>
    baseUrl +
    `api/shoe-detail?name=${name}&size=${size}&color=${color}&sizePage=100000`,
  //   getShoeDetail: (
  //     id: string | number,
  //     currentPage: string | number,
  //     pageSize: string | number
  //   ) =>
  //     baseUrl +
  //     `api/shoe-detail?shoe=${id}?page=${currentPage}?sizePage=${pageSize}`,
};
export default API;
