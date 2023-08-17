export interface ProductType {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
  off: string;
}
export interface Product {
  id: number;
  name: string;
}
export interface IType {
  createAt: null;
  createBy: null;
  deleted: null;
  id: number;
  name: string;
  updateAt: null;
  updateBy: null;
}
// export interface IProduct{
//   createAt: string,
//   updateAt:string ,
//   createBy:string ,
//   updateBy:string ,
//         deleted: boolean,
//         id: number,
//         shoeDetail: {
//             createAt:string,
//             updateAt: string,
//             createBy: string,
//             updateBy: string,
//             deleted: boolean,
//             id: number,
//             shoe: {
//               createAt: string,
//               updateAt: string,
//               createBy: string,
//               updateBy: string,
//                 delete: boolean,
//                 id: number,
//                 name:string,
//                 brand: {
//                     createAt: boolean,
//                     updateAt: boolean,
//                     createBy: boolean,
//                     updateBy: boolean,
//                     deleted: boolean,
//                     id: number,
//                     name: string
//                 },
//                 "category": {
//                     "createAt": boolean,
//                     "updateAt": boolean,
//                     "createBy": boolean,
//                     "updateBy": boolean,
//                     "deleted": boolean,
//                     "id": 1,
//                     "name": "Nam"
//                 }
//             },
//             "size": {
//                 "createAt": null,
//                 "updateAt": null,
//                 "createBy": null,
//                 "updateBy": null,
//                 "deleted": null,
//                 "id": 1,
//                 "name": "40"
//             },
//             "sole": {
//                 "createAt": null,
//                 "updateAt": null,
//                 "createBy": null,
//                 "updateBy": null,
//                 "deleted": null,
//                 "id": 2,
//                 "name": "Gỗ"
//             },
//             "color": {
//                 "createAt": null,
//                 "updateAt": null,
//                 "createBy": null,
//                 "updateBy": null,
//                 "deleted": null,
//                 "id": 1,
//                 "name": "Xanh"
//             },
//             "code": "BS1689687631007",
//             "price": 409999.00,
//             "quantity": 23,
//             "weight": 2000.0
//         },
//         "name": "http://res.cloudinary.com/beeshoes/image/upload/v1689654696/products/x1zso7jnx2lyukdffwpe.jpg",
//         "mainImage": null
// }
