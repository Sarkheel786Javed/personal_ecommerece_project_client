import { useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Products from "../Products/Products";
import TopprodectsbyFilter from "../TopProdectsbyFilter/TopprodectsbyFilter";
function HomePage() {
  const [isDropdownOpen, setDropdownOpen] = useState(true);

  // const AnimatedRecords = (value: number) => {
  //   const [animatedValue, setAnimatedValue] = useState(0);

  //   useEffect(() => {
  //     let start: number | null = null;
  //     const duration = 2000; // 1 second
  //     const initialValue = 0;

  //     const animate = (timestamp: number) => {
  //       if (start === null) start = timestamp;
  //       const progress = timestamp - start;
  //       const newValue = Math.min(
  //         initialValue + (value - initialValue) * (progress / duration),
  //         value
  //       );
  //       setAnimatedValue(newValue);

  //       if (progress < duration) {
  //         requestAnimationFrame(animate);
  //       }
  //     };

  //     requestAnimationFrame(animate);
  //   }, [value]);

  //   return (
  //     <div className="border border-light p-1 d-flex justify-content-center align-items-center">
  //       <div
  //         className="border border-light"
  //         style={{
  //           width: `${animatedValue}%`,
  //           height: "10px",
  //           backgroundColor: "white",
  //         }}
  //       ></div>
  //       <label className="d-flex justify-content-center align-items-center mx-2">
  //         {Math.round(animatedValue)}%
  //       </label>
  //     </div>
  //   );
  // };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
          {/* //////////////////////////header end//////////////////////////////// */}
          <div className="d-flex justify-content-between align-items-end">
            <div className="d-flex justify-content-start align-items-center">
              <div className="dropdown_button">
                <span
                  className="dropdown_toggle bg-warning dropdown-toggle"
                  onClick={() =>
                    isDropdownOpen === true
                      ? setDropdownOpen(false)
                      : setDropdownOpen(true)
                  }
                >
                  All departments
                </span>
                <div className="dropdown_menu shadow">
                  <ul
                    className={`list_department_ul ${
                      isDropdownOpen === true ? "d-block" : " d-none"
                    }`}
                  >
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 1
                      </Link>
                    </li>
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 2
                      </Link>
                    </li>
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 3
                      </Link>
                    </li>
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 4
                      </Link>
                    </li>
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 5
                      </Link>
                    </li>
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 6
                      </Link>
                    </li>
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 7
                      </Link>
                    </li>
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 8
                      </Link>
                    </li>
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 9
                      </Link>
                    </li>
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 10
                      </Link>
                    </li>
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 10
                      </Link>
                    </li>
                    <li className="list_department_li">
                      <Link to="/" className="text-decoration-none">
                        Department of 10
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-end align-items-center gap-2 ">
            <button
              className={`carousel-control-prev border border-warning rounded-3 Carousel_Active_Buttons`}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <i
                className="bi bi-chevron-left text-warning fs-3"
                aria-hidden="true"
              />
            </button>
            <button
              className={`carousel-control-next border border-warning rounded-3 Carousel_Active_Buttons`}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <i
                className="bi bi-chevron-right text-warning fs-3"
                aria-hidden="true"
              />
            </button>
          </div>
          </div>

          {/* //////////////////////////header end//////////////////////////////// */}
          
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={0}
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={1}
                aria-label="Slide 2"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={2}
                aria-label="Slide 3"
              />
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/img3.jpg"
                  className={`Carousel_background_img`}
                  alt="..."
                />
                <div className="carousel-caption">
                  <div className="carousel_content">
                    <div className="carousel_content_text">
                      <h5>First slide label</h5>
                      <p>
                        Some representative placeholder content for the first
                        slide.
                      </p>
                    </div>
                  </div>
                  <div className={`carousel_inner_img`}>
                    <img src="/img3.png" className={`img`} alt="..." />
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="/finance-elements-frame_23-2148080960.jpg"
                  className={`Carousel_background_img`}
                  alt="..."
                />
                <div className="carousel-caption">
                  <div className="carousel_content">
                    <div className="carousel_content_text">
                      <h5>Second slide label</h5>
                      <p>
                        Some representative placeholder content for the first
                        slide.
                      </p>
                    </div>
                  </div>
                  <div className={`carousel_inner_img`}>
                    <img src="/img3.png" className={`img`} alt="..." />
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="/shopping-bag-cart_23-2148879372.jpg"
                  className={`Carousel_background_img`}
                  alt="..."
                />
                <div className="carousel-caption">
                  <div className="carousel_content">
                    <div className="carousel_content_text">
                      <h5>Third slide label</h5>
                      <p>
                        Some representative placeholder content for the first
                        slide.
                      </p>
                    </div>
                  </div>
                  <div className={`carousel_inner_img`}>
                    <img src="/img3.png" className={`img`} alt="..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Products />
          <TopprodectsbyFilter />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
