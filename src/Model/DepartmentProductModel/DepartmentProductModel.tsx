export interface ProductModel {
  productName?: string;
  description?: string;
  size?: string;
  gender?: string;
  price?: number;
  stock?: number;
  discount?: number;
  discountType?: string;
  category?: string;
  imageUrls?: string[];
  images?: File[]; // Use File[] if storing File objects
  singleImg?: string;
  singleImgName?: string;
  hover?:number
}
