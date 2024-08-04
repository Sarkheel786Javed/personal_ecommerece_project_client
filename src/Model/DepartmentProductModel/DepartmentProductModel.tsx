export interface ProductModel {
  productName: string;
  description: string;
  size: string;
  gender: string;
  price: number;
  stock: number;
  discount: number;
  discountType: string;
  category: string;
  // productImages: string[]; // Ensure this matches the type returned by your backend
  imageUrls: string[]; // Ensure this matches the type returned by your backend
  images: File[]; // Files array for local state
  singleImg: string;
  singleImgName: string;
  hover: number;
}
