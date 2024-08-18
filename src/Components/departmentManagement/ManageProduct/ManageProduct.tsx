import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./styles.scss";
import { ProductModel } from "../../../Model/DepartmentProductModel/DepartmentProductModel";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ProductService } from "../../../Services/ProductServices/ProductServices";
import axios from "axios";

const initialProduct: ProductModel = {
  productName: "",
  description: "",
  size: "M",
  gender: "Unisex",
  price: 0,
  stock: 0,
  discount: 0,
  discountType: "Chinese New Year Discount",
  category: "",
  imageUrls: [],
  images: [],
  singleImg: "",
  singleImgName: "",
  hover: 0,
  rating: 0,
  onSale: false,
};

const ManageProduct = () => {
  const [product, setProduct] = useState<ProductModel>(initialProduct);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const maxFiles = 10;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductModel>({
    defaultValues: initialProduct,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFilesArray = Array.from(e.target.files);

      if (newFilesArray.length + product.images!.length > maxFiles) {
        setErrorMessage(`You can only upload up to ${maxFiles} images.`);
        return;
      }
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images!, ...newFilesArray],
      }));
      setErrorMessage(null);
    }
  };

  const handleImageDelete = (index: number) => {
    setProduct((prevProduct) => {
      const updatedImages = prevProduct.images!.filter(
        (_: any, i: any) => i !== index
      );

      const newIndex =
        currentImageIndex! >= updatedImages.length
          ? updatedImages.length - 1
          : currentImageIndex;

      const newSingleImg =
        newIndex != null && updatedImages[newIndex]
          ? URL.createObjectURL(updatedImages[newIndex])
          : "";
      const newSingleImgName =
        newIndex != null && updatedImages[newIndex]
          ? updatedImages[newIndex].name
          : "";

      return {
        ...prevProduct,
        images: updatedImages,
        singleImg: newSingleImg,
        singleImgName: newSingleImgName,
      };
    });

    setCurrentImageIndex((prevIndex) =>
      prevIndex !== null && prevIndex >= product.images!.length
        ? product.images!.length - 1
        : prevIndex
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handelShowLargeImg = (img: File, index: number) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      singleImg: URL.createObjectURL(img),
      singleImgName: img.name,
      hover: index,
    }));
    setCurrentImageIndex(index);
  };

  const onSubmit: SubmitHandler<ProductModel> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("productName", data.productName);
      formData.append("category", data.category);
      formData.append("discountType", data.discountType);
      formData.append("discount", data.discount.toString());
      formData.append("stock", data.stock.toString());
      formData.append("price", data.price.toString());
      formData.append("gender", data.gender);
      formData.append("size", data.size);
      formData.append("description", data.description);

      data.images!.forEach((file) => {
        formData.append("images", file);
      });

      const response = await ProductService.addProduct(formData)
      console.log("Product added:", response.data);
      // getData();
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage("An error occurred while adding the product.");
    }
  };

  // const [showdata, getShowData] = useState<ProductModel[]>([]);
  // useEffect(() => {
  //   getData();
  // }, []);
  // const getData = async () => {
  //   await ProductService.getProduct().then((res) => {
  //     getShowData(res.data);
  //   });
  // };

  return (
    <div className="w-100">
      <h1 className="mx-5 mt-3">Add New Product</h1>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row border rounded mt-5">
            <div className="col-12 ">
              <h2>General Information</h2>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
              <div className="input-group my-3">
                <TextField
                  fullWidth
                  id="outlined-error"
                  label="Product Name"
                  {...register("productName", { required: "Product name is required" })}
                  error={!!errors.productName}
                  helperText={errors.productName?.message}
                />
              </div>
              <div className="input-group my-3">
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  {...register("description", { required: "Description is required" })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </div>
              <div className="w-100 mt-4">
                <h2>Upload Image</h2>
                <input
                  className="form-control w-100"
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleInputChange}
                />
                {errorMessage && (
                  <div className="text-danger">{errorMessage}</div>
                )}
                <div className="images-section">
                  <div className="product small_img">
                    {product.images!.slice(0, maxFiles).map((image, index) => (
                      <div
                        key={index}
                        className="position-relative"
                        onMouseEnter={() => handelShowLargeImg(image, index)}
                        onMouseDown={() =>
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            hover: index,
                          }))
                        }
                      >
                        <img
                          className={`rounded my-1 ${product.hover === index
                              ? "inner_img_hover"
                              : "inner_img"
                            } `}
                          src={URL.createObjectURL(image)}
                          alt={`Product ${index}`}
                          width="100%"
                          style={{ maxHeight: "400px" }}
                        />
                        <div
                          className={`${product.hover === index ? "d-flex" : "d-none"
                            } position-absolute border bg-danger rounded delete_img`}
                          onClick={() => handleImageDelete(index)}
                        >
                          X
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="large_image">
                    {product.singleImg && (
                      <>
                        <p className="text-center">
                          {product.singleImgName}
                        </p>
                        <img
                          src={product.singleImg}
                          alt={`Product`}
                          width="100%"
                          style={{ maxHeight: "400px" }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="w-100 d-flex flex-wrap justify-content-start align-items-start gap-3 my-3">
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Size"
                    {...register("size")}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </TextField>
                  <div className="section">
                    <h5>Gender</h5>
                    <RadioGroup
                      row
                      defaultValue="Unisex"
                      aria-labelledby="demo-radio-buttons-group-label"
                      {...register("gender")}
                    >
                      <FormControlLabel
                        value="Unisex"
                        control={<Radio />}
                        label="Unisex"
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="w-100 d-flex flex-wrap justify-content-start align-items-start gap-3 my-3">
                <TextField
                  fullWidth
                  id="outlined-error"
                  label="Price"
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price must be greater than or equal to 0",
                    },
                  })}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
                <TextField
                  fullWidth
                  id="outlined-error"
                  label="Stock"
                  type="number"
                  {...register("stock", {
                    required: "Stock is required",
                    min: {
                      value: 0,
                      message: "Stock must be greater than or equal to 0",
                    },
                  })}
                  error={!!errors.stock}
                  helperText={errors.stock?.message}
                />
                <TextField
                  fullWidth
                  id="outlined-error"
                  label="Discount"
                  type="number"
                  {...register("discount", {
                    min: {
                      value: 0,
                      message: "Discount must be greater than or equal to 0",
                    },
                  })}
                  error={!!errors.discount}
                  helperText={errors.discount?.message}
                />
              </div>
              <div className="w-100">
                <TextField
                  fullWidth
                  id="outlined-error"
                  label="Category"
                  {...register("category", { required: "Category is required" })}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              </div>
            </div>
          </div>
          <div className="w-100 d-flex flex-row-reverse">
            <button
              className="btn btn-outline-primary my-4"
              type="submit"
              id="formSubmit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageProduct;
