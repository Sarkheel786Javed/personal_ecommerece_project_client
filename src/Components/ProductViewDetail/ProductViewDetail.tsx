import "./style.scss";
import {
  Button,
  ButtonGroup,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { NavigateNextOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { useAuth } from "../../app/createContextAuth/createContex";
import { ProductService } from "../../Services/ProductServices/ProductServices";
import { CategoryModel } from "../../Model/DepartmentProductModel/DepartmentProductModel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
function ProductViewDetail() {
  const [auth] = useAuth();
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    // console.info("You clicked a breadcrumb.");
  }
  const product = useSelector((state: RootState) => state.ProductViewDetail);
  const [images, setImages] = useState<File>(product.images[0]);
  const hamgleimages = (img: File) => {
    setImages(img);
  };

  const [productsCategory, setProductsCategory] = useState<any>();
  const getAllProductsCategory = async () => {
    try {
      const response = await ProductService.getCategories({
        params: {
          userId: "",
          searchString: "",
        },
      });
      if (response.data && response.data.length > 0) {
        const data: CategoryModel[] = response.data;
        if (data && data.length > 0) {
          const category = data.find((cat) =>
            (product.categoryId as string[]).includes(cat._id)
          );
          if (category) {
            setProductsCategory(category.categoryName);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProductsCategory();
  }, []);
  return (
    <div>
      <Breadcrumbs
        className="mx-5 mt-3"
        separator={<NavigateNextOutlined fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          className="text-decoration-none text-secondary fw-bold"
          underline="hover"
          key="1"
          color="inherit"
          href="/"
          onClick={handleClick}
        >
          Home
        </Link>
        <Link
          className="btn btn-secondary text-decoration-none fw-bold"
          underline="hover"
          key="2"
          color="inherit"
          href="/material-ui/getting-started/installation/"
          onClick={handleClick}
        >
          {auth.userName}
        </Link>
        <Link
          className="btn btn-secondary text-decoration-none fw-bold"
          underline="hover"
          key="2"
          color="inherit"
          href="/material-ui/getting-started/installation/"
          onClick={handleClick}
        >
          {productsCategory}
        </Link>
        <Typography key="3" sx={{ color: "text.primary" }}>
          {product?.productName}
        </Typography>
      </Breadcrumbs>
      <div className="container-fluid mt-5 text-dark">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 position-relative">
            <img
              className="rounded-4"
              src={`${images}`}
              alt=""
              width={"100%"}
              style={{ maxHeight: "calc(100vh - 200px)", objectFit: "fill" }}
            />
            <div className="d-flex flex-wrap justify-content-evenly position-absolute bottom-0 mb-2 w-100 ">
              {product.images.map((img) => (
                <img
                  className="hover-effect rounded-top-1"
                  src={`${img}`}
                  alt={`${img}`}
                  width={"50px"}
                  height={"50px"}
                  onClick={() => hamgleimages(img)}
                />
              ))}
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
            <label className="cursor-pointer">{productsCategory}</label>
            <Typography className="fs-2 mb-2">{product.productName}</Typography>
            <Typography className="mb-3">
              <Rating name="disabled" value={product.rating} disabled />
            </Typography>
            <Typography className="mb-3">( customer reviews)</Typography>
            <Typography className="mb-3">
              Availability:{" "}
              <label className="text-success fw-bold">
                {product.stock} in stock
              </label>
            </Typography>
            <Divider />
            <div className="d-flex flex-wrap gap-3">
              <Typography className="mb-2">
                <FavoriteBorderIcon />
                <label className="mx-2">Wishlist</label>
              </Typography>
              <Typography className="mb-2">
                <AutorenewIcon />
                <label className="mx-2">Compare</label>
              </Typography>
            </div>
            <Typography className="mb-2">{product.description}</Typography>
            <Typography className="mb-2 text-secondary fs-2">
              ${product.price}
              <label className=" text-decoration-line-through fs-4 mx-2">
                ${product.discount}
              </label>
            </Typography>
            <Typography className="mb-2 text-dark fs-6">
              Colors:
              {/* <label className=' text-decoration-line-through fs-4 mx-2'>${product.discount}</label> */}
            </Typography>
            <div className="d-flex flex-wrap justify-content-start gap-3 my-2">
              <ButtonGroup variant="outlined" className="rounded-3" aria-label="Basic button group">
                <Button>0</Button>
                <Button>-</Button>
                <Button>+</Button>
              </ButtonGroup>
              <Button variant="contained" color="warning" startIcon={<AddShoppingCartIcon/>}>
                Add To Card
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductViewDetail;
