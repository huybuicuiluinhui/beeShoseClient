import slugify from "slugify";
import { IProduct, Product } from "../types/product.type";

export const convertToCurrencyString = (number: number | string): string => {
  // Kiểm tra xem giá trị đầu vào có phải là kiểu number không
  if (typeof number === "number") {
    if (number === undefined || number === null) {
      const currencyString = 0;
      return "0";
    } else {
      const currencyString = number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return currencyString;
    }
  } else {
    return "";
  }
};

export const renderColor = (item: IProduct) => {
  const namesArray = [];
  const jsonArrayString = `[${item.color}]`;

  try {
    const jsonArray = JSON.parse(jsonArrayString);

    namesArray.push(jsonArray.map((item: any) => item.name));
  } catch (error) {
    console.error("Lỗi phân tích chuỗi JSON:", error);
  }
  return namesArray.join(", ");
};
export const toSlug = (text: string) => {
  return slugify(text, {
    lower: true,
  });
};
export function findProductIdByName(
  nameToCheck: string | number,
  productList: Product[]
): number | null {
  const product = productList.find((item) => item.name === nameToCheck);
  if (product) {
    return product.id;
  } else {
    return null;
  }
}
export function filterColor(color: string) {}
