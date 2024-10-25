import { useEffect, useState } from "react";
import "./TopProdectsbyFilter.scss";
import * as React from "react";
import { ProductModel } from "../../Model/DepartmentProductModel/DepartmentProductModel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductService } from "../../Services/ProductServices/ProductServices";
import { motion } from "framer-motion";
import { useAuth } from "../../app/createContextAuth/createContex";
function TopprodectsbyFilter() {
  const SetInterval = () => {
    // Set a future date and time
    // const futureDate = new Date('2024-07-25T09:01:59').getTime();
    const futureDate = new Date().getTime() + 36000000;

    // Calculate the milliseconds from now until the future date
    const millisecondsUntilFutureDate = futureDate - new Date().getTime();

    const [timeLeft, setTimeLeft] = useState(millisecondsUntilFutureDate);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1000;
          if (newTime <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    const formatTime = (time: any) => {
      return time < 10 ? `0${time}` : `${time}`;
    };

    // const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // const displayTime = `${formatTime(hours)}:${formatTime(
    //   minutes
    // )}:${formatTime(seconds)}`;

    return (
      <div className="">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div className="">
            <div className="offer_timer bg-light border d-flex justify-content-center align-items-center fs-2">
              {formatTime(hours)}
            </div>
            Hours
          </div>
          <div className="">
            <div className="offer_timer bg-light border d-flex justify-content-center align-items-center fs-2">
              {formatTime(minutes)}
            </div>
            MINS
          </div>
          <div className="">
            <div className="offer_timer bg-light border d-flex justify-content-center align-items-center fs-2">
              {formatTime(seconds)}
            </div>
            SECS
          </div>
        </div>
        {/* <p>Time Left: {displayTime}</p> */}
      </div>
    );
  };
  return (
    <motion.div
      className="w-100 mt-5"
      // initial={{opacity: 0 , scale: 0}}
      // whileInView={{opacity: 1 , scale: 1}}
      // transition={{duration: 2}}

      // viewport={{once:true}}
    >
      <div className="container-fluid">
        <div className="row">
          <motion.div
            className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 border border-warning card_cover p-3"
            // initial={{
            //   opacity: 0,
            //   x: -300,
            // }}
            // whileInView={{
            //   opacity: 1,
            //   x: 0, // Slide in to its original position
            //   transition: {
            //     duration: 0.6, // Animation duration
            //   },
            // }}
            // viewport={{ once: true }}
          >
            <div className=" card_header">
              <div className="">
                Special
                <br />
                Offer
              </div>
              <div className="offer_price border bg-warning text-dark">
                <div className="">
                  <span className="w-100 text-center">Save</span>
                  <br />
                  <span className="w-100 fw-bold text-center">$125</span>
                </div>
              </div>
            </div>
            <div className=" img_section mt-3 ">
              <img
                src=""
                className="cursor_pointer"
                alt="...."
                width="100%"
                height="100%"
              />
            </div>
            <div className="cursor_pointer w-100 d-flex justify-content-center align-items-start">
              <label className="cursor_pointer w-75 p-3 text-primary text-center">
                Game Console Controller + USB 3.0 Cable
              </label>
            </div>
            <div className="text-center d-flex justify-content-center align-items-center">
              <label className="fs-6 text-decoration-line-through">$99.0</label>
              <label className="text-danger fs-4 mx-2">$79,00</label>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <label className="">
                Available: <label className="fw-bold">6</label>
              </label>
              <label className="">
                Already Sold: <label className="fw-bold">28</label>
              </label>
            </div>
            <div className="progress_bar border bg-light">
              <div
                className="bg-warning progress_bar_inner"
                style={{ width: "calc(28% - 6%)" }}
              ></div>
            </div>
            <div>
              <div className="text-center mt-3">Hurry Up! Offer ends in:</div>
              <SetInterval />
            </div>
          </motion.div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 col-xl-8 col-xxl-8 pt-3">
            <motion.div
            // initial={{
            //   opacity: 0,
            //   x: 300,
            // }}
            // whileInView={{
            //   opacity: 1,
            //   x: 0, // Slide in to its original position
            //   transition: {
            //     duration: 0.8, // Animation duration
            //   },
            // }}
            // viewport={{ once: true }}
            >
              <ProductComponent />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TopprodectsbyFilter;

interface ProductModelGetProduct {
  organizationUserId: String;
  productName: string;
  rating: number;
  onSale: boolean;
  featured: boolean;
}

const ProductComponent: React.FC = () => {
  const [auth] = useAuth();
  const [tab, setTab] = useState("onSale");
  // const [searchQueryString] = useSearchParams();
  const [handleFilter, setHandleFilter] = useState<ProductModelGetProduct>({
    organizationUserId: "",
    productName: "",
    rating: 0,
    onSale: true,
    featured: false,
  });

  useEffect(() => {
    if (auth._id) {
      setHandleFilter((preValue) => ({
        ...preValue,
        organizationUserId: String(auth._id),
      }));
    }
  }, [auth._id]);
  // const a = searchQueryString.get("q");
  // const navigate = useNavigate();

  // useEffect(()=>{
  //   setHandleFilter((preValue) => ({
  //     ...preValue,
  //     productName: String(a),
  //   }));
  // },[a])

  useEffect(() => {
    const { organizationUserId, productName, rating, onSale, featured } =
      handleFilter;
    if (organizationUserId && organizationUserId !== "0") {
      if (productName || rating || onSale || featured) {
        fetchProducts();
      }
    }
  }, [handleFilter]);

  const [products, setProducts] = useState<ProductModel[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getProduct({
        params: {
          organizationUserId: handleFilter.organizationUserId,
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

  const [hoveredImageIndex, setHoveredImageIndex] = useState<
    Record<number, string>
  >({});

  const handleSingleImage = (img: any, index: number) => {
    setHoveredImageIndex((prev) => ({
      ...prev,
      [index]: img,
    }));
  };
  return (
    <div className="w-100">
      <div className="d-flex justify-content-start align-items-center border-bottom w-100">
        <div className="w-100 d-flex justify-content-center align-items-center gap-3 py-2">
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
        {/* <div className="w-25 d-flex justify-content-center align-items-center gap-3 py-2">
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
        </div> */}
      </div>
      <div className="d-flex flex-wrap justify-content-start algn-items-center gap-2">
        {products.length > 0 ? (
          <>
            {products.slice(0, 6).map((product, index) => (
              <div key={index} className="card_cover_card py-2">
                <div className="card_header w-100">
                  <div className="side_Images">
                    {product.images.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        className="my-1"
                        onMouseEnter={() => handleSingleImage(img, index)}
                        src={`${img}`}
                        alt={product.productName}
                        width="100%"
                        height="100%"
                        style={{
                          border:
                            hoveredImageIndex[index] === String(img)
                              ? "2px solid red"
                              : "none",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                  <div className="main_Images">
                    <img
                      src={`
                      ${
                        hoveredImageIndex[index]
                          ? hoveredImageIndex[index]
                          : product.images[0]
                      }
                    `}
                      alt={product.productName}
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
                <div className="card_body px-2">
                  <div
                    className="truncate"
                    style={{ width: `${product.productName.slice(0, 80)}` }}
                  >
                    {product.productName}
                  </div>
                  <div className="d-flex justify-content-between align-content-end">
                    <div className="">
                      <div className="fs-6 text-danger text-decoration-line-through">
                        ${product.price}
                      </div>
                      <div className="">
                        ${product.price - product.discount}
                      </div>
                    </div>
                    <div className="bi bi-cart3 bg-warning text-danger  buy_product" />
                  </div>
                </div>
                <div className="card_footer"></div>
              </div>
            ))}
          </>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};
