import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ProdeuctViewDetail = {
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
const initialState: ProdeuctViewDetail = {
    _id: "0",
    productName: "",
    description: "",
    size: "M",
    gender: "Unisex",
    price: 0,
    stock: 0,
    discount: 0,
    discountType: "Chinese New Year Discount",
    imageUrls: [],
    images: [],
    singleImg: "",
    singleImgName: "",
    hover: 0,
    rating: 0,
    onSale: false,
    featured: false,
    organizationName: "",
    categoryId: [],
    organizationUserId: "",}


const ProductDetaileSlice = createSlice({
   name: 'ProductViewDetail',
   initialState: initialState,
   reducers: {
      AddProduct: (state , action:PayloadAction<Partial<ProdeuctViewDetail>>) => {
        return {...state , ...action.payload}
      },
    //   UpdateProduct: (state , action:PayloadAction<Partial<ProdeuctViewDetail>>) => {
    //     return {...state , ...action.payload}
    //   },
      DeleteProduct: () => {
        return initialState
      },
    //   incrementByValue: (state, action: PayloadAction<number>) =>{
    //      state.value = action.payload
    //   }
   }
})

export const { AddProduct, DeleteProduct } = ProductDetaileSlice.actions
export default ProductDetaileSlice.reducer
// export default counterSlice.reducer

// import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// export type CounterState = {
//    value: number
// }

// const initialState: CounterState = {
//    value: 0
// }


// const counterSlice = createSlice({
//    name: 'counter',
//    initialState: initialState,
//    reducers: {
//       increment: (state) => {
//          state.value += 1
//       },
//       decrement: (state) => {
//          state.value -= 1
//       },
//       incrementByValue: (state, action: PayloadAction<number>) =>{
//          state.value = action.payload
//       }
//    }
// })

// export const { increment, decrement, incrementByValue } = counterSlice.actions
// export default counterSlice.reducer