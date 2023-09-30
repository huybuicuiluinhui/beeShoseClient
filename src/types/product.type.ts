export interface Product {
  id: number;
  name: string;
}
export interface IOrderType {
  customers: string;
  amount: number;
  status: number;
  totalMoney: number;
  date: string;
  id: string;
}
export interface IDataAside {
  id: number;
  name: string;
  img: string;
}
export interface IDataBrand {
  img: string;
  name: string;
}

export interface IProduct {
  brand: string;
  category: string;
  color: string;
  description: string;
  id: number;
  images: string;
  index: number;
  maxPrice: number;
  minPrice: number;
  name: string;
  quantity: number;
  size: any;
  status: boolean;
}
export interface IDetailProduct {
  code: string;
  color: string;
  id: number;
  images: any;
  index: number;
  name: string;
  price: number;
  quantity: number;
  size: string | number;
  sole: string;
  status: boolean;
  weight: number;
}
export interface IInforShoe {
  createAt: string;
  updateAt: string;
  createBy: string;
  updateBy: string;
  deleted: boolean;
  id: number;
  name: string;
  brand: Product;
  category: Product;
  description: any;
}
