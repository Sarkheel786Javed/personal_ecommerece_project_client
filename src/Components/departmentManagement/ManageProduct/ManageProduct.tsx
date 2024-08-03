import { useRef, useState } from "react";
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

const initialProduct: ProductModel = {
  productName: "Puffer Jacket With Pocket Detail",
  description:
    "Cropped puffer jacket made of technical fabric. High neck and long sleeves. Flap pocket at the chest and in-seam side pockets at the hip. Inside pocket detail. Hem with elastic interior. Zip-up front.",
  size: "M",
  gender: "Unisex",
  price: 47.55,
  stock: 77,
  discount: 10,
  discountType: "Chinese New Year Discount",
  category: "Jacket",
  imageUrls: [],
  images: [],
  singleImg: "",
  singleImgName: "",
  hover: 0,
};

const ManageProduct = () => {
  const [product, setProduct] = useState<ProductModel>(initialProduct);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const maxFiles = 10;

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
      setErrorMessage(null); // Clear any previous error message
    }

    // const { name, value, files } = e.target;
    // if (name === "images" && files) {
    //   const fileArray = Array.from(files);
    //   if (fileArray.length + product.images!.length > maxFiles) {
    //     e.target.value = ""; // Clear the input field
    //     return;
    //   }
    //   const singleImg =
    //     fileArray.length > 0 ? URL.createObjectURL(fileArray[0]) : "";
    //   const singleImgName = fileArray.length > 0 ? fileArray[0].name : "";
    //   setProduct((prevProduct) => ({
    //     ...prevProduct,
    //     images: [...prevProduct.images!, ...fileArray],
    //     singleImg,
    //     singleImgName,
    //   }));
    //   setErrorMessage(""); // Clear any previous error message
    //   return;
    // }
    // setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageDelete = (index: number) => {
    setProduct((prevProduct) => {
      const updatedImages = prevProduct.images!.filter(
        (_: any, i: any) => i !== index
      );

      // Determine the new image to display
      const newIndex =
        currentImageIndex! >= updatedImages.length
          ? updatedImages.length - 1
          : currentImageIndex;

      // Update single image display if needed
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

    // Adjust currentImageIndex if the deleted image was the one being displayed
    setCurrentImageIndex((prevIndex) =>
      prevIndex !== null && prevIndex >= product.images!.length
        ? product.images!.length - 1
        : prevIndex
    );

    // Clear the file input value
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

  const handleSaveDraft = () => {
    console.log("Saving draft:", product);
    // Add your logic to save the product draft here
  };

  const handleImageUpload = async (images: File[]) => {
    try {
      if (images.length > maxFiles) {
        setErrorMessage(`You can only upload up to ${maxFiles} images.`);
        return;
      }
      const formData = new FormData();
      images.forEach((file) => {
        formData.append("images", file);
      });
      console.log("formData=====>", formData);
      const response = await ProductService.uploadImages(formData);
      return response.data.imagePaths;
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleAddProduct = async (product: ProductModel) => {
    try {
      const response = await ProductService.addProduct( product);
      console.log("Product added:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      product.images!.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
  
      // Add other product fields to formData
      formData.append("productName", product.productName!);
      formData.append("description", product.description!);
      formData.append("size", product.size!);
      formData.append("gender", product.gender!);
      formData.append("price", product.price!.toString());
      formData.append("stock", product.stock!.toString());
      formData.append("discount", product.discount!.toString());
      formData.append("discountType", product.discountType!);
      formData.append("category", product.category!);
  
      const response = await ProductService.uploadImages(formData);
      const imagePaths = response.data.imagePaths; // Assuming response.data.imagePaths is the array of strings
  
      const updatedProduct: ProductModel = { 
        ...product, 
        imageUrls: imagePaths, // This should be a string array
        images: [] 
      };
      await handleAddProduct(updatedProduct);
    } catch (error) {
      console.error("Error submitting product:", error);
      setErrorMessage("Error submitting product.");
    }
  };
  
  

  return (
    <div className="w-100">
      <h1 className="mx-5 mt-3">Add New Product</h1>
      <div className="container">
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
                name="productName"
                value={product.productName}
                onChange={(e) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    productName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-group my-3">
              <TextField
                id="outlined-multiline-static"
                fullWidth
                label="Description"
                multiline
                rows={4}
                name="description"
                value={product.description}
                onChange={(e) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    description: e.target.value,
                  }))
                }
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
              {errorMessage !== "" && (
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
                        className={`rounded my-1 ${
                          product.hover === index
                            ? "inner_img_hover"
                            : "inner_img"
                        } `}
                        src={URL.createObjectURL(image)}
                        alt={`Product ${index}`}
                        width="100%"
                        style={{ maxHeight: "400px" }}
                      />
                      <div
                        className={`${
                          product.hover === index ? "d-flex" : "d-none"
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
                      <p className="text-center">{product.singleImgName}</p>
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
                  defaultValue="S"
                  SelectProps={{
                    native: true,
                  }}
                  name="size"
                  value={product.size}
                  onChange={(e) =>
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      size: e.target.value,
                    }))
                  }
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </TextField>
                <div className="section">
                  <h5>Gender</h5>
                  <div className="d-flex flex-wrap justify-content-start align-items-start gap-3">
                    <div className="my-2 d-flex flex-wrap justify-content-start align-items-center gap-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        value={product.gender}
                        onChange={(e) =>
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            gender: e.target.value,
                          }))
                        }
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="unisex"
                          control={<Radio />}
                          label="Unisex"
                        />
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 border rounded">
            <div className="section">
              <h2>Pricing And Stock</h2>
              <div className="input-group my-3">
                <label htmlFor="price">Base Pricing</label>
                <input
                  className="form-control w-100"
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={(e) =>
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      price: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="input-group my-3">
                <label htmlFor="stock">Stock</label>
                <input
                  className="form-control w-100"
                  type="number"
                  id="stock"
                  name="stock"
                  value={product.stock}
                  onChange={(e) =>
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      stock: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="input-group my-3">
                <label htmlFor="discount">Discount</label>
                <input
                  className="form-control w-100"
                  type="number"
                  id="discount"
                  name="discount"
                  value={product.discount}
                  onChange={(e) =>
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      discount: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="input-group my-3">
                <label htmlFor="discountType">Discount Type</label>
                <select
                  id="discountType"
                  name="discountType"
                  value={product.discountType}
                  onChange={(e) =>
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      discountType: e.target.value,
                    }))
                  }
                >
                  <option value="Chinese New Year Discount">
                    Chinese New Year Discount
                  </option>
                  {/* Add more discount types here */}
                </select>
              </div>
            </div>
            <div className="section">
              <h2>Category</h2>
              <div className="input-group my-3">
                <label htmlFor="category">Product Category</label>
                <input
                  className="form-control w-100"
                  type="text"
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={(e) =>
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      category: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-outline-danger"
                onClick={handleSaveDraft}
              >
                Save Draft
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={handleSubmit}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
