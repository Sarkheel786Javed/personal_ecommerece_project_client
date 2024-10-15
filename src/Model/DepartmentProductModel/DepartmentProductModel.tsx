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
  imageUrls: string[]; // Ensure this matches the type returned by your backend
  images: File[]; // Files array for local state
  singleImg: string;
  singleImgName: string;
  hover: number;
  rating:number;
  onSale:boolean
  featured:boolean
  organizationName:string;
  categoryId: [];
  organizationUserId:string;
}

export interface Category {
  _id: string;
  categoryName: string;
  organization: string;
}
export interface CategoryModel {
  _id: string;
  categoryName: string;
  organization: string;
  totalCategories:number
}
