// import * as React from "react";
import { useState } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
// const drawerWidth = 240;
// const navItems = [
//   { Title: "Home", Icon: "", Path: "/home" },
//   { Title: "Login", Icon: "", Path: "/login" },
//   { Title: "Sign up", Icon: "", Path: "/signup" },
// ];

function Navbar() {
  const TopLinks = [
    {
      items: (
        <div
          style={{ height: "15px" }}
          className="d-flex justify-content-between align-items-center border-end px-2"
        >
          <i
            className="cursor-pointer mx-1 bi bi-geo-alt"
            style={{ fontSize: "12px" }}
          />
          <div className="cursor-pointer" style={{ fontSize: "12px" }}>
            Store Locater
          </div>
        </div>
      ),
      LinkTo: "/",
    },
    {
      items: (
        <div
          style={{ height: "15px" }}
          className="d-flex justify-content-between align-items-center border-end px-2"
        >
          <i
            className="cursor-pointer mx-1 bi bi-truck"
            style={{ fontSize: "12px" }}
          />
          <div className="cursor-pointer" style={{ fontSize: "12px" }}>
            Track Order
          </div>
        </div>
      ),
      LinkTo: "/",
    },
    {
      items: (
        <div
          style={{ height: "15px" }}
          className="d-flex justify-content-between align-items-center border-end px-2"
        >
          <i
            className="cursor-pointer mx-1 bi bi-currency-dollar"
            style={{ fontSize: "12px" }}
          />
          <div className="cursor-pointer" style={{ fontSize: "12px" }}>
            Dollar(US)
          </div>
        </div>
      ),
      LinkTo: "/",
    },
    {
      items: (
        <div
          style={{ height: "15px" }}
          className="d-flex justify-content-between align-items-center  px-2"
        >
          <i
            className="cursor-pointer mx-1 bi bi-person-fill"
            style={{ fontSize: "12px" }}
          />
          <div className="cursor-pointer" style={{ fontSize: "12px" }}>
            Register or Sign In
          </div>
        </div>
      ),
      LinkTo: "/login",
    },
  ];
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <div>
      {/* ///////////////////////top////////////////////// */}
      <div
        className={`${styles.top} justify-content-between align-items-center border-bottom py-2 `}
      >
        <div className="text-secondary mx-5" style={{ fontSize: "12px" }}>
          Welcome to Worldwide Electronics Store
        </div>
        <div className="d-flex justify-content-start align-items-center ">
          <div className="d-flex justify-content-start align-items-center gap-3 px-3">
            {TopLinks.map((item) => (
              <Link
                to={item.LinkTo}
                className="text-decoration-none text-secondary"
              >
                <span className="">{item.items}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* ///////////////////////top end////////////////////// */}
      {/* ///////////////////navbar main////////////////////// */}
      <div className="d-flex justify-content-start align-items-center py-4">
        <div
          className={`d-flex justify-content-center align-items-center ${styles.logo}`}
        >
          <h1 className="cursor-pointer text-secondary">electro.</h1>
        </div>
        <div
          className={`${styles.searchSection} justify-content-between align-items-center`}
        >
          <div className="fs-2">
            {showSidebar === false ? (
              <i
                className="bi bi-list opacity-100"
                onClick={() => setShowSidebar(true)}
              />
            ) : (
              <i
                className="fs-2 bi bi-x-lg opacity-0"
                onClick={() => setShowSidebar(false)}
              />
            )}
          </div>
          <div
            className={`bg-warning ${styles.searchboxanddropdown} justify-content-center align-items-center  py-1 mx-3`}
          >
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div className="w-75 ">
                <input
                  type="text"
                  autoComplete="false"
                  placeholder="Search for Products"
                  className={`mx-1 w-100 ps-3 ${styles.input}`}
                />
              </div>
              <div
                className="ps-3 d-flex justify-content-center align-items-center px-2"
                style={{ backgroundColor: "white", height: "35px" }}
              >
                <div className="dropdown">
                  <div
                    className="dropdown-toggle cursor-pointer"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All Categories
                  </div>
                  <ul
                    className="dropdown-menu mt-3"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="cursor-pointer dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className=" cursor-pointer dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="cursor-pointer dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <i className=" cursor-pointer mx-4 bi bi-search"></i>
            </div>
          </div>
          <div className={` ${styles.SearchIcon_on_small_screen}`}>
            <div
              className="mx-4 bi bi-search cursor-pointer"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            />
          </div>
        </div>
        <div className={` ${styles.last_section}`}>
          <div className="d-flex justify-content-center align-items-center">
            <span
              className={`fs-4 text-secondary cursor-pointer ${styles.Heart}`}
              data-bs-toggle="tooltip"
              data-bs-html="true"
              title="Compare"
            >
              <Link to="/" className="cursor-pointer  text-secondary">
                <i className="fs-3 bi bi-arrow-repeat cursor-pointer" />
              </Link>
            </span>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div
              className={`fs-4 text-secondary cursor-pointer ${styles.Heart}`}
              data-bs-toggle="tooltip"
              data-bs-html="true"
              title="Favourites"
            >
              <Link to="/" className="cursor-pointer  text-secondary">
                <div className="fs-3 bi bi-heart" />
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div
              className={`fs-4 text-secondary cursor-pointer ${styles.my_Accounts}`}
              data-bs-toggle="tooltip"
              data-bs-html="true"
              title="MyAccounts"
            >
              <Link to="/login" className="cursor-pointer  text-secondary">
                <i className="fs-3 bi bi-person-fill" />
              </Link>
            </div>
          </div>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginRight: "20px" }}
          >
            <span
              className="cursor-pointer fs-4 text-secondary"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              title="Cart"
            >
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/" className="cursor-pointer  text-secondary">
                  <i className="cursor-pointer fs-3 bi bi-bag" />
                </Link>
                <div
                  className="mt-3 mx-2 bg-warning d-flex justify-content-center align-items-center position-absolute"
                  style={{
                    borderRadius: "50px",
                    width: "25px",
                    height: "25px",
                    fontSize: "12px",
                  }}
                >
                  12
                </div>
                <div className={`mx-2 fs-6 ${styles.cart}`}>321.564</div>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
            <div className={`bg-warning ${styles.SearchBox_Small_Screen}`}>
              <input
                type="text"
                autoComplete="false"
                placeholder="Search for Products"
                className={`w-100 px-3 ${styles.input}`}
              />
              <span
                className="cursor-pointer mx-4 bi bi-search"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              />
            </div>
          </div>
        </div>
      </div>

      {/* /////////////////navbar main end/////////////////// */}
    </div>
  );
}

export de