export const baseUrl = "http://localhost:8080/";
const API = {
  getBrand: () => baseUrl + "api/brand",
  getSize: () => baseUrl + "api/size",
  getSole: () => baseUrl + "api/sole",
  getShoesImg: () => baseUrl + "api/images",
};
export default API;
