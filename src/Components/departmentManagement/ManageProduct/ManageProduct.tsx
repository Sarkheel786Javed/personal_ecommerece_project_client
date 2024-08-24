import { HtmlHTMLAttributes, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./styles.scss";
import { ProductModel } from "../../../Model/DepartmentProductModel/DepartmentProductModel";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { ProductService } from "../../../Services/ProductServices/ProductServices";
import Dropzone, { Accept, FileRejection } from "react-dropzone";
import Swal from "sweetalert2";

const initialProduct: ProductModel = {
  _id: "",
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
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  useEffect(() => {
    fetchProducts();
  }, []);

  const [product, setProduct] = useState<ProductModel>(initialProduct);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const maxTotalFiles = 6;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductModel>({
    defaultValues: initialProduct,
  });

  const accept: Accept = {
    "image/jpeg": [".jpeg", ".jpg"],
    "image/png": [".png"],
    "image/gif": [".gif"],
  };

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const remainingSlots = maxTotalFiles - product.images.length;

    if (fileRejections.length > 0) {
      const rejectionMessages = fileRejections.map((rejection) => {
        const { file, errors } = rejection;
        return errors.map((e) => `${file.name}: ${e.message}`).join(", ");
      });
      setErrorMessage(rejectionMessages.join("; "));
    } else {
      setErrorMessage(null);
    }

    if (acceptedFiles.length > remainingSlots) {
      setErrorMessage(`You can only add ${remainingSlots} image(s).`);
      acceptedFiles = acceptedFiles.slice(0, remainingSlots);
    }

    if (acceptedFiles.length > 0) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, ...acceptedFiles],
      }));
    }
  };

  const handleImageDelete = (index: number) => {
    setProduct((prevProduct) => {
      const updatedImages = prevProduct.images.filter((_, i) => i !== index);
      return {
        ...prevProduct,
        images: updatedImages,
      };
    });
  };
  const [id, setId] = useState("");
  const onSubmit: SubmitHandler<ProductModel> = async (data) => {
    try {
      const formData = new FormData();
      if (id) {
        formData.append("_id", id);
      }

      formData.append("productName", data.productName || "");
      formData.append("category", data.category || "");
      formData.append("discountType", data.discountType || "");
      formData.append("discount", (data.discount ?? 0).toString());
      formData.append("stock", (data.stock ?? 0).toString());
      formData.append("price", (data.price ?? 0).toString());
      formData.append("gender", data.gender || "");
      formData.append("size", data.size || "");
      formData.append("description", data.description || "");
      formData.append("rating", (data.rating ?? 0).toString());
      formData.append("onSale", (data.onSale ?? false).toString());
      formData.append("featured", (data.featured ?? false).toString());

      product.images.forEach((file) => {
        formData.append("images", file);
      });

      await ProductService.addProduct(formData).then((res) => {
        if (res.data) {
          reset();
          setProduct(initialProduct);
          setErrorMessage(null);
          setId("");
          fetchProducts();
        }
        Toast.fire({
          showCloseButton: true,
          icon: "success",
          title: res.data.message,
        });
      });
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage("An error occurred while adding the product.");
    }
  };
  ///////////////////////////////////////get product/////////////////////////////
  interface ProductModelGetProduct {
    productName: string;
    rating: number;
    onSale: boolean;
    featured: boolean;
  }
  const [handleFilter, setHandleFilter] = useState<ProductModelGetProduct>({
    productName: "",
    rating: 0,
    onSale: false,
    featured: false,
  });
  useEffect(() => {
    fetchProducts();
  }, [handleFilter]);

  const [productsTable, setProductsTable] = useState<any[]>([]);

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
      if (response.data.length > 0) {
        setProductsTable(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductsTable([]); // Reset to an empty array on error
    }
  };
  const ProductDetail = () => {
    const setValues = (data: ProductModel) => {
      setProduct(data);
      reset({
        productName: data.productName,
        description: data.description,
        size: data.size,
        gender: data.gender,
        price: data.price,
        stock: data.stock,
        discount: data.discount,
        discountType: data.discountType,
        category: data.category,
        imageUrls: data.imageUrls,
        images: data.images,
        singleImg: data.singleImg,
        singleImgName: data.singleImgName,
        hover: data.hover,
        rating: data.rating,
        onSale: data.onSale,
        featured: data.featured,
      });
      setId(data._id!);
    };
    const handledeleteProduct = async (ProductId: string) => {
      try {
        const response = await ProductService.deleteProduct(ProductId);
        // Ensure response.data is an array
        if (response.data) {
          Toast.fire({
            showCloseButton: true,
            icon: "success",
            title: response.data.message,
          });
          fetchProducts();
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductsTable([]); // Reset to an empty array on error
      }
    };

    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        try {
          const response = await ProductService.getProduct({
            params: {
              productName: searchTerm,
              rating: 0,
              onSale: false,
              featured: false,
            },
          });
          // Ensure response.data is an array
          if (response.data.length > 0) {
            setProductsTable(response.data);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          setProductsTable([]); // Reset to an empty array on error
        }
      }
    };
    return (
      <>
        <div className="container">
          <div className="d-flex justify-content-start align-items-center border-bottom w-100">
            <div className="w-50 d-flex justify-content-center align-items-center gap-3 py-2">
              {/* Your tab buttons here */}
            </div>
            <div className="w-50 d-flex justify-content-end align-items-center gap-3 py-2">
              <TextField
                id="outlined-size-small"
                placeholder="Search Product Name"
                size="small"
                value={searchTerm}
                onChange={handleInputChange} // Handle input changes without triggering a search
                onKeyPress={handleKeyPress} // Trigger search on Enter key press
              />
            </div>
          </div>
          <div className="w-100">
            {productsTable.length > 0 ? (
              <>
                {productsTable.map((data) => (
                  <table className="table table-hover" key={data._id}>
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Handle</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{data.productName}</th>
                        <td>{data.price}</td>
                        <td>{data.discount}</td>
                        <td></td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => setValues(data)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handledeleteProduct(data._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </>
            ) : (
              <>No Product Found</>
            )}
          </div>
        </div>
      </>
    );
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
                  id="outlined-required"
                  type="text"
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
                <h2>Upload Images</h2>
                <Dropzone onDrop={onDrop} accept={accept}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div
                      {...getRootProps({
                        className: isDragActive
                          ? "dropzone active"
                          : "dropzone",
                      })}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      )}
                    </div>
                  )}
                </Dropzone>

                {errorMessage && (
                  <div className="text-danger mt-2">{errorMessage}</div>
                )}

                <div className="row my-3">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-3 mx-auto"
                    >
                      <div className="card text-center">
                        <img
                          src={
                            typeof image === "string"
                              ? image
                              : URL.createObjectURL(image)
                          }
                          alt={`product-${index}`}
                          className="card-img-top img-fluid"
                        />

                        <div className="card-body">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleImageDelete(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
            {id ? <>Update Product</> : <>Save Product</>}
          </button>
        </form>
      </div>
      <ProductDetail />
    </div>
  );
};

export default ManageProduct;
