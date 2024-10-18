import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./styles.scss";
import {
  Category,
  ProductModel,
} from "../../../Model/DepartmentProductModel/DepartmentProductModel";
import { IconButton, Menu, Slider, TextField, Typography } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { ProductService } from "../../../Services/ProductServices/ProductServices";
import Dropzone, { Accept, FileRejection } from "react-dropzone";
import Swal from "sweetalert2";
import { useAuth } from "../../../app/createContextAuth/createContex";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CommonModal2 from "../../CommonModal2/CommonModal2";

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

const ManageProduct = () => {
  const initialProduct: ProductModel = {
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
    organizationUserId: "",
  };

  const [productsTable, setProductsTable] = useState<ProductModel[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [auth] = useAuth();

  interface filterModel {
    userId: string;
    productName: string;
    rating: number;
    onSale: boolean;
    featured: boolean;
  }
  const [filteredProduct, setFilteredProduct] = useState<filterModel>({
    userId: "0",
    productName: "",
    rating: 0,
    onSale: false,
    featured: false,
  });

  useEffect(() => {
    if (auth._id) {
      setFilteredProduct((preValue) => ({
        ...preValue,
        userId: String(auth._id),
      }));
    }
  }, [auth._id]);

  useEffect(() => {
    const { userId, productName, rating, onSale, featured } = filteredProduct;

    if (userId && userId !== "0") {
      // Decide whether to fetch all products or filtered products
      if (productName || rating || onSale || featured) {
        getProduct();
      } else {
        getAllProducts();
      }
    }
  }, [filteredProduct]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const marks = [
    { value: 0, label: " 0" },
    { value: 1, label: " 1" },
    { value: 2, label: " 2" },
    { value: 3, label: " 3" },
    { value: 4, label: " 4" },
  ];

  const handleChangeRatingFilter = (value: number) => {
    setFilteredProduct((preValue) => ({
      ...preValue,
      rating: value,
    }));
  };
  const getAllProducts = async () => {
    try {
      const response = await ProductService.getProduct({
        params: {
          organizationUserId: filteredProduct.userId,
          productName: filteredProduct.productName,
          rating: filteredProduct.rating,
          onSale: filteredProduct.onSale,
          featured: filteredProduct.featured,
        },
      });
      if (response.data.length > 0 && !response.data.response) {
        setProductsTable(response.data);
      }
    } catch (error) {
      setProductsTable([]);
      console.error("Error fetching products:", error);
    }
  };

  const handledeleteProduct = async (ProductId: string) => {
    try {
      const response = await ProductService.deleteProduct(ProductId);
      if (response.data) {
        Toast.fire({
          showCloseButton: true,
          icon: "success",
          title: response.data.message,
        });
        getAllProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setProductsTable([]);
    }
  };
  const [show, setShow] = useState(false);

  const [editValues, setEditValue] = useState<ProductModel>(initialProduct);
  const handleClose = () => {
    setShow(false);
    setEditValue(initialProduct);
  };
  const handleSetValue = (data: ProductModel) => {
    setEditValue(data);
    setShow(true);
  };
  const handleShow = () => {
    setShow(true);
  };

  // const [categories, setCategories] = useState<Category[]>([]);

  // const getCategories = async () => {
  //   try {
  //     const response = await ProductService.getCategories("");
  //     if (response.data){
  //       setCategories(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };
  const TableComponent = () => {
    return (
      <div className="w-100">
        {productsTable && productsTable.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Discount</th>
                {/* <th scope="col">Handle</th> */}
                <th scope="col">Images</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {productsTable.map((row: ProductModel) => (
                <tr key={row._id}>
                  <th scope="row">{row.productName}</th>
                  <td>{row.price}</td>
                  <td>{row.discount}</td>
                  <td>{row.images.length}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSetValue(row)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handledeleteProduct(row._id!)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Product Found</p>
        )}
      </div>
    );
  };
  const getProduct = async () => {
    try {
      if (filteredProduct.productName !== "") {
        debugger;
        const response = await ProductService.getProduct({
          params: {
            organizationUserId: filteredProduct.userId,
            productName: filteredProduct.productName,
            rating: filteredProduct.rating,
            onSale: filteredProduct.onSale,
            featured: filteredProduct.featured,
          },
        });
        if (response.data.length > 0 && !response.data.response) {
          debugger;
          setProductsTable(response.data);
        }
      } else {
        debugger;
        const response = await ProductService.getProduct({
          params: {
            organizationUserId: filteredProduct.userId,
            productName: filteredProduct.productName,
            rating: filteredProduct.rating,
            onSale: filteredProduct.onSale,
            featured: filteredProduct.featured,
          },
        });
        debugger;
        if (response.data.length > 0 && !response.data.response) {
          debugger;
          setProductsTable(response.data);
        }
      }
    } catch (err) {
      setProductsTable([]);
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-wrap  justify-content-end align-items-center py-5 gap-3">
        <input
          type="text"
          className="input_table"
          onChange={(e) =>
            setFilteredProduct((preValue) => ({
              ...preValue,
              productName: e.target.value,
            }))
          }
        />
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <FilterAltIcon />
        </IconButton>
        <button type="button" className="btn btn-warning" onClick={handleShow}>
          Add New Product
        </button>
      </div>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem sx={{ display: "block" }} onClick={handleClose}>
          <Typography sx={{ fontSize: "20px" }} onClick={handleClose}>
            By Rating
          </Typography>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Steps"
              defaultValue={0}
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={0}
              max={4}
              onChange={(e, value) => {
                console.log(e);
                handleChangeRatingFilter(value as number);
                handleClose();
              }}
            />
          </Box>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <input
            type="checkbox"
            checked={filteredProduct.onSale}
            onChange={(e) => {
              setFilteredProduct((preValue) => ({
                ...preValue,
                onSale: e.target.checked,
              }));
              handleClose();
            }}
          />
          <Typography sx={{ fontSize: "20px" }} onClick={handleClose}>
            OnSale
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <input
            type="checkbox"
            checked={filteredProduct.featured}
            onChange={(e) => {
              setFilteredProduct((preValue) => ({
                ...preValue,
                featured: e.target.checked,
              }));
              handleClose();
            }}
          />
          <Typography sx={{ fontSize: "20px" }} onClick={handleClose}>
            Featured
          </Typography>
        </MenuItem>
      </Menu>
      <div className="">
        <TableComponent />
      </div>
      {show && (
        <CommonModal2
          show={show}
          getAllProductsProp={getAllProducts}
          editValues={editValues}
          modalNameProp="DepartmentProduct"
          handleClose={handleClose}
          handleShow={handleShow}
        />
      )}
    </div>
  );
};

export default ManageProduct;

export const AddDepartmentProduct = (props: any) => {
  const [existingImageUrls, setExistingImageUrls] = useState<any[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    organizationUserId: "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductModel>({
    defaultValues: initialProduct,
  });

  const theme = useTheme();

  useEffect(() => {
    getCategories();
    if (props.editValues._id && props.editValues._id !== "0") {
      setValue("_id", props.editValues._id);
      setValue("productName", props.editValues.productName);
      setValue("description", props.editValues.description);
      setValue("size", props.editValues.size);
      setValue("gender", props.editValues.gender);
      setValue("price", props.editValues.price);
      setValue("stock", props.editValues.stock);
      setValue("discount", props.editValues.discount);
      setValue("discountType", props.editValues.discountType);
      setValue("hover", props.editValues.hover);
      // setValue("rating", props.editValues.rating);
      setFeaturedChecked(props.editValues.featured);
      setOnSaleChecked(props.editValues.onSale);
      setRatingChecked(props.editValues.rating);
      // setValue("featured", props.editValues.featured);
      setValue("organizationName", props.editValues.organizationName);
      setValue("organizationUserId", props.editValues.organizationUserId);
      setValue("categoryId", props.editValues.categoryId);
      setExistingImageUrls(props.editValues?.images || []);
      setSelectedCategories(
        props.editValues.categoryId.map((id: any) => String(id))
      );
    }
  }, [props.editValues]);

  const getCategories = async () => {
    try {
      const response = await ProductService.getCategories("");
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const accept: Accept = {
    "image/jpeg": [".jpeg", ".jpg"],
    "image/png": [".png"],
    "image/gif": [".gif"],
  };

  const maxTotalFiles = 6;

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const remainingSlots = maxTotalFiles - images.length;

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
      setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    }
  };

  // Handle deletion of new images
  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle deletion of existing images
  const handleExistingImageDelete = (index: number) => {
    const urlToDelete = existingImageUrls[index];
    setDeletedImageUrls((prev) => [...prev, urlToDelete]);
    setExistingImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleChange = (
    event: SelectChangeEvent<typeof selectedCategories>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  // Helper function for styling categories
  function getStyles(
    categoryName: string,
    selectedCategories: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight:
        selectedCategories.indexOf(categoryName) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const [onSaleChecked, setOnSaleChecked] = useState<any>();
  const [ratingChecked, setRatingChecked] = useState<any>();
  const [featuredChecked, setFeaturedChecked] = useState<any>();

  const [auth] = useAuth();
  const onSubmit: SubmitHandler<ProductModel> = async (data) => {
    try {
      const formData = new FormData();
      if (data._id) {
        formData.append("_id", data._id);
      }

      formData.append("productName", data.productName || "");
      formData.append("description", data.description || "");
      formData.append("size", data.size || "");
      formData.append("gender", data.gender || "");
      formData.append("price", (data.price ?? 0).toString());
      formData.append("stock", (data.stock ?? 0).toString());
      formData.append("discount", (data.discount ?? 0).toString());
      formData.append("discountType", data.discountType || "");
      formData.append("hover", (data.hover ?? 0).toString());
      formData.append("rating", (data.rating ?? 0).toString());
      formData.append("onSale", (data.onSale ?? false).toString());

      formData.append("featured", (data.featured ?? false).toString());
      formData.append("organizationName", (auth.Organization ?? "").toString());
      formData.append("organizationUserId", (auth._id ?? "").toString());

      // Append existing image URLs to retain
      existingImageUrls.forEach((url) =>
        formData.append("existingImageUrls", url)
      );

      // Append image URLs marked for deletion
      deletedImageUrls.forEach((url) =>
        formData.append("deletedImageUrls", url)
      );

      images.forEach((image) => {
        formData.append("images", image); // Assuming images is an array of File objects
      });

      // Append selected category IDs
      // Append selected category IDs
      selectedCategories.forEach((id) => {
        formData.append("categoryId", id);
      });

      // Make the API call to add or update the product
      await ProductService.addProduct(formData).then((res) => {
        Toast.fire({
          showCloseButton: true,
          icon: "success",
          title: res.data.message,
        });
        reset();
        props.handleClose();
        props.getAllProductsProp();
      });
    } catch (error) {
      console.error("Error adding/updating product:", error);
      setErrorMessage("An error occurred while processing the product.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <div className="row border rounded mt-5">
          <div className="col-12">
            <h2>General Information</h2>
          </div>
          <div className="col-lg-8">
            {/* Product Name */}
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
                fullWidth
              />
            </div>

            {/* Description */}
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

            {/* Upload Images */}
            <div className="w-100 mt-4">
              <h2>Upload Images</h2>
              <Dropzone onDrop={onDrop} accept={accept}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div
                    {...getRootProps({
                      className: isDragActive ? "dropzone active" : "dropzone",
                    })}
                    style={{
                      border: "2px dashed #cccccc",
                      padding: "20px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>
                        Drag 'n' drop some files here, or{" "}
                        <button
                          type="button"
                          className="btn btn-outline-primary mt-3"
                        >
                          Upload Images
                        </button>
                      </p>
                    )}
                  </div>
                )}
              </Dropzone>

              {errorMessage && (
                <div className="text-danger mt-2">{errorMessage}</div>
              )}

              {/* Display Existing and New Images */}
              <div className="row my-3">
                {/* Existing Images */}
                {existingImageUrls.map((url, index) => (
                  <div
                    key={`existing-${index}`}
                    className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-3 mb-3"
                  >
                    <div className="card text-center">
                      <img
                        src={url}
                        alt={`existing-product-${index}`}
                        className="card-img-top img-fluid"
                      />
                      <div className="card-body">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleExistingImageDelete(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* New Images */}
                {images.map((image, index) => (
                  <div
                    key={`new-${index}`}
                    className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-3 mb-3"
                  >
                    <div className="card text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`new-product-${index}`}
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

            {/* Additional Product Details */}
            <div className="w-100 d-flex flex-wrap justify-content-start align-items-start gap-3 my-3">
              {/* Discount Type */}
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="category-multiple-chip-label">
                  Categories
                </InputLabel>
                <Select
                  labelId="category-multiple-chip-label"
                  id="category-multiple-chip"
                  multiple
                  value={selectedCategories}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Categories"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((id) => {
                        const category = categories?.find(
                          (cat) => cat._id === id
                        );
                        return category ? (
                          <Chip key={id} label={category.categoryName} />
                        ) : null;
                      })}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250,
                      },
                    },
                  }}
                >
                  {categories?.map((category) => (
                    <MenuItem
                      key={category._id}
                      value={category._id}
                      style={getStyles(
                        category.categoryName,
                        selectedCategories,
                        theme
                      )}
                    >
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Discount Type */}
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
                fullWidth
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

              {/* Discount */}
              <TextField
                type="number"
                label="Discount"
                {...register("discount", {
                  required: "Discount is required",
                })}
                error={!!errors.discount}
                helperText={errors.discount?.message}
                fullWidth
              />

              {/* Price */}
              <TextField
                type="number"
                label="Price"
                {...register("price", { required: "Price is required" })}
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
              />

              {/* Stock */}
              <TextField
                type="number"
                label="Stock"
                {...register("stock", { required: "Stock is required" })}
                error={!!errors.stock}
                helperText={errors.stock?.message}
                fullWidth
              />
              <div className="d-block">
                <div className="d-flex justify-content-start align-items-center gap-3 my-3">
                  <input
                    type="checkbox"
                    {...register("onSale")}
                    checked={onSaleChecked}
                    onChange={(e) => setOnSaleChecked(e.target.checked)}
                  />
                  <label className="">OnSale</label>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-3 my-3">
                  <input
                    type="checkbox"
                    {...register("rating")}
                    checked={ratingChecked}
                    onChange={(e) => setRatingChecked(e.target.checked)}
                  />
                  <label className="">Rating</label>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-3 my-3">
                  <input
                    type="checkbox"
                    {...register("featured")}
                    checked={featuredChecked}
                    onChange={(e) => setFeaturedChecked(e.target.checked)}
                  />
                  <label className="">Featured</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button className="btn btn-success my-3" type="submit">
        Save Product
      </button>
    </form>
  );
};
