export interface ProductModel {
  _id?:string;
  productName: string;
  description: string;
  size: string;
  gender: string;
  price: number;
  stock: number;
  discount: number;
  discountType: string;
  category: string;
  imageUrls: string[]; // Ensure this matches the type returned by your backend
  images: File[]; // Files array for local state
  singleImg: string;
  singleImgName: string;
  hover: number;
  rating:number;
  onSale:boolean
  featured:boolean
}
