import React from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignupModel } from "../../Model/AuthModel/AuthModel";
import {AuthService} from "../../Services/AuthServices/AuthServices";
import Swal from "sweetalert2";
function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  //---------------validations---------------\\
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupModel>(); // Explicitly type useForm
  //---------------validations---------------\\
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const onSubmit = async (data: SignupModel) => {
    try {
      await AuthService.SignupAuth(data).then((res) => {
        if (res.data.success) {
          Toast.fire({
            showCloseButton: true,
            icon: "success",
            title: "Registered successfully",
          });
          navigate("/login");
        } else {
          Toast.fire({
            showCloseButton: true,
            icon: "error",
            title: res.data.error,
          });
        }
      });
    } catch (error) {
      Toast.fire({
        showCloseButton: true,
        icon: "error",
        title: String(error),
      });
    }
  };

  return (
    <div className="body">
      <form
        className="box rounded-2"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="border Auth_active">
          <Link
            to="/login"
            className={`${
              location.pathname === "/login" ? "Login_active" : "Active_any"
            }`}
          >
            <div>Login</div>
          </Link>
          <Link
            to="/signup"
            className={`${
              location.pathname === "/signup" ? "Signup_active" : "Active_any"
            }`}
          >
            <div>Signup</div>
          </Link>
        </div>{" "}
        {/* <p className="text-dark"> Please enter your login email and password!</p> */}
        <div className="">
          <input
            type="text"
            id="validationCustom01"
            className="input_Text"
            {...register("userName", { required: true })}
            placeholder="FullName"
          />
          {errors.userName && (
            <div className="text-danger">Full Name is required</div>
          )}
        </div>
        <div className="">
          <input
            type="text"
            id="validationCustom01"
            className="input_Text"
            {...register("answer", { required: true })}
            placeholder="Father Name"
          />
          {errors.answer && (
            <div className="text-danger">Father Name is required</div>
          )}
        </div>
        <div className="">
          <input
            type="text"
            id="validationCustom01"
            className="input_Text"
            {...register("phoneNumbber", { required: true })}
            placeholder="Phone Numbber"
          />
          {errors.phoneNumbber && (
            <div className="text-danger">Phone Numbber is required</div>
          )}
        </div>
        <div className="">
          <input
            type="text"
            id="validationCustom01"
            className="input_Text"
            {...register("addressLine1", { required: true })}
            placeholder="Address"
          />
          {errors.addressLine1 && (
            <div className="text-danger">Address is required</div>
          )}
        </div>
        <div className="">
          <input
            type="text"
            id="validationCustom01"
            className="input_Text"
            {...register("city", { required: true })}
            placeholder="City"
          />
          {errors.city && <div className="text-danger">City is required</div>}
        </div>
        <div className="">
          <input
            type="text"
            id="validationCustom01"
            className="input_Text"
            {...register("country", { required: true })}
            placeholder="Country"
          />
          {errors.country && (
            <div className="text-danger">Country is required</div>
          )}
        </div>
        <div className="">
          <input
            type="text"
            id="validationCustom01"
            className="input_Text"
            {...register("email", { required: true })}
            placeholder="name@example.com"
          />
          {errors.email && <div className="text-danger">Email is required</div>}
        </div>
        <div className="d-flex justify-content-center  align-items-center ">
          <input
            type={showPassword ? "text" : "password"}
            id="validationCustom04"
            className="input_Text"
            {...register("password", { required: true })}
            placeholder="Password*********"
          />
          <label
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid grey",
              borderRadius: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "-40px",
            }}
            onClick={handleClickShowPassword}
            onMouseDown={(e) => handleMouseDownPassword(e)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-eye-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-eye-slash-fill"
                viewBox="0 0 16 16"
              >
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
              </svg>
            )}
          </label>
        </div>
        {errors.password && (
          <div style={{ color: "red" }}>Password is Required</div>
        )}
        {/* //////////////////////////////////////////////////////////// */}
        <Link className="fw-bold text-dark forgot text-dark" to="/forget">
          Forgot password?
        </Link>
        <button type="submit" className="mt-3 w-100 btn btn-outline-warning">
          Sign up
        </button>
        <div className="col-md-12 mt-3">
          <ul className="social-network social-circle">
            <li>
              <Link to="/" className="icoFacebook" title="Facebook">
                <i className="bi bi-facebook"></i>
              </Link>
            </li>
            <li>
              <Link to="/" className="icoTwitter" title="Twitter">
                <i className="bi bi-twitter"></i>
              </Link>
            </li>
            <li>
              <Link to="/" className="icoGoogle" title="Google +">
                <i className="bi bi-google"></i>
              </Link>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
