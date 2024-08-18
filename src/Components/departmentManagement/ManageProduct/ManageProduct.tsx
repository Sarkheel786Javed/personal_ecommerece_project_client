import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./styles.scss";
import { ProductModel } from "../../../Model/DepartmentProductModel/DepartmentProductModel";
import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ProductService } from "../../../Services/ProductServices/ProductServices";
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
  featured: false,
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
    reset,
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
      formData.append("rating", data.rating.toString());
      formData.append("onSale", data.onSale.toString());
      formData.append("featured", data.featured.toString());

      // Append images
      product.images.forEach((file) => {
        formData.append("images", file);
      });

      await ProductService.addProduct(formData).then((res) => {
        if (res.data) {
          reset();
        }
      });
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage("An error occurred while adding the product.");
    }
  };

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
                  {...register("productName", {
                    required: "Product name is required",
                  })}
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
                  {...register("description", {
                    required: "Description is required",
                  })}
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
                    {...register("size", { required: "Size is required" })}
                    SelectProps={{
                      native: true,
                    }}
                    error={!!errors.size}
                    helperText={errors.size?.message}
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
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
                      onChange={(e) =>
                        setProduct((prevProduct) => ({
                          ...prevProduct,
                          gender: (e.target as HTMLInputElement).value,
                        }))
                      }
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
                  id="outlined-select-currency-native"
                  select
                  label="Discount Type"
                  {...register("discountType", {
                    required: "Discount type is required",
                  })}
                  SelectProps={{
                    native: true,
                  }}
                  error={!!errors.discountType}
                  helperText={errors.discountType?.message}
                >
                  <option value="Chinese New Year Discount">
                    Chinese New Year Discount
                  </option>
                  <option value="Diwali Discount">Diwali Discount</option>
                  <option value="Christmas Discount">Christmas Discount</option>
                  <option value="Summer Discount">Summer Discount</option>
                  <option value="Winter Discount">Winter Discount</option>
                  <option value="Black Friday Discount">
                    Black Friday Discount
                  </option>
                </TextField>
                <TextField
                  type="number"
                  label="Discount"
                  {...register("discount", {
                    required: "Discount is required",
                  })}
                  error={!!errors.discount}
                  helperText={errors.discount?.message}
                />
                <TextField
                  type="number"
                  label="Price"
                  {...register("price", { required: "Price is required" })}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
                <TextField
                  type="number"
                  label="Stock"
                  {...register("stock", { required: "Stock is required" })}
                  error={!!errors.stock}
                  helperText={errors.stock?.message}
                />
                <TextField
                  label="Category"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("onSale")}
                      checked={product.onSale}
                      onChange={(e) =>
                        setProduct((prevProduct) => ({
                          ...prevProduct,
                          onSale: e.target.checked,
                        }))
                      }
                    />
                  }
                  label="On Sale"
                />
              </div>
            </div>
          </div>
          <button className="btn btn-success my-3" type="submit">
            Save Product
          </button>
        </form>
      </div>
      <GetProduct />
    </div>
  );
};

export default ManageProduct;

const GetProduct = () => {
  interface ProductModelGetProduct {
    productName: string;
    rating: number;
    onSale: boolean;
    featured: boolean;
  }
  const [tab, setTab] = useState("rating");
  const [handleFilter, setHandleFilter] = useState<ProductModelGetProduct>({
    productName: "",
    rating: 1,
    onSale: false,
    featured: false,
  });
  useEffect(() => {
    fetchProducts;
  }, [tab, handleFilter]);

  const [products, setProducts] = useState<ProductModel[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getProduct({
        params: {
          productName: handleFilter.productName,
          rating: handleFilter.rating,
          onSale: handleFilter.onSale,
          featured: handleFilter.featured,
        },
      });
      // Ensure response.data is an array
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Reset to an empty array on error
    }
  };
  return (
    <>
      <div className="d-flex justify-content-start align-items-center border-bottom w-100">
        <div className="w-75 d-flex justify-content-center align-items-center gap-3 py-2">
          <div
            className={`p-2 rounded-4 ${
              tab === "rating" ? "bg-warning shadow" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => [
              setHandleFilter((preValue) => ({
                ...preValue,
                rating: 1,
                productName: "",
                onSale: false,
                featured: false,
              })),
              setTab("rating"),
            ]}
          >
            Rating
          </div>
          <div
            className={`p-2 rounded-4 ${
              tab === "onSale" ? "bg-warning shadow" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => [
              setHandleFilter((preValue) => ({
                ...preValue,
                onSale: true,
                rating: 0,
                productName: "",
                featured: false,
              })),
              setTab("onSale"),
            ]}
          >
            On Sale
          </div>
          <div
            className={`p-2 rounded-4 ${
              tab === "featured" ? "bg-warning shadow" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => [
              setHandleFilter((preValue) => ({
                ...preValue,
                featured: true,
                onSale: false,
                rating: 0,
                productName: "",
              })),
              setTab("featured"),
            ]}
          >
            Featured
          </div>
        </div>
        <div className="w-25 d-flex justify-content-center align-items-center gap-3 py-2">
          <input
            className="form-control"
            type="text"
            placeholder="Search products..."
            value={handleFilter.productName}
            onChange={(e) =>
              setHandleFilter((preValue) => ({
                ...preValue,
                productName: e.target.value,
              }))
            }
          />
          <button
            className="btn btn-outline-primary"
            onClick={() => fetchProducts()}
          >
            Search
          </button>
        </div>
      </div>
      <div className="">
        {products.length > 0 ? (
          <>
            {products.map(() => (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                  </tbody>
                </table>
              </>
            ))}
          </>
        ) : (
          <>No Product Found</>
        )}
      </div>
    </>
  );
};
