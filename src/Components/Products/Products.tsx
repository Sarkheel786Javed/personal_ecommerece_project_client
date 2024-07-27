import { Link } from "react-router-dom";
import "./products.scss";
function Products() {
  const deals = [
    {
      name: "CATCH BIG DEALS ON THE CAMERAS",
      button: "Shop now",
      icon: "bi bi-chevron-right",
    },
    {
      name: "CATCH BIG DEALS ON THE CAMERAS",
      button: "Shop now",
      icon: "bi bi-chevron-right",
    },
    {
      name: "CATCH BIG DEALS ON THE CAMERAS",
      button: "Shop now",
      icon: "bi bi-chevron-right",
    },
    {
      name: "CATCH BIG DEALS ON THE CAMERAS",
      button: "Shop now",
      icon: "bi bi-chevron-right",
    },
  ];
  return (
    <div className="mt-5">
      <div className="container-fluid">
        <div className="row">
          {deals.map((data, index) => (
            <div
              key={index}
              className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 p-2 cursor-pointer"
            >
              <Link to="/" className="text-decoration-none cursor-pointer">
                <div className=" deals_container p-2 cursor-pointer">
                  <div className=" imgsection rounded cursor-pointer">
                    <img
                      className="rounded cursor-pointer"
                      src=""
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <div className="content cursor-pointer">
                    <label className="px-2 cursor-pointer">{data.name}</label>
                    <span className="px-2 mt-2 cursor-pointer text-dark d-flex justify-content-between align-items-start">
                      {data.button}
                      <label className={`icon p-1 ${data.icon}`}></label>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
