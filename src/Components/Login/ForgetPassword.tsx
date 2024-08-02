import "./style.scss";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthService } from "../../Services/AuthServices/AuthServices";
import { ForgetModel } from "../../Model/AuthModel/AuthModel";
import { Link } from "react-router-dom";
function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetModel>(); // Explicitly type useForm
  //---------------validations---------------\\
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })
  const onSubmit = async (data: ForgetModel) => {
    try {
      AuthService.Forget(data).then((res) => {

        if (res.data.success) {
          Toast.fire({
            showCloseButton: true,
            icon: 'success',
            title: "Registered successfully",
          })
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate("/");
          if (res.data.user.role !== 0) {
            navigate("/private/auth/admin-dashboard");
          } else {
            navigate("/");
          }
        } else {
          Toast.fire({
            showCloseButton: true,
            icon: 'error',
            title: res.data.error,
          })
        }
      });
    } catch (error) {
      Toast.fire({
        showCloseButton: true,
        icon: 'error',
        title: String(error),
      })
    }
  };

  return (
    <div className=" body">
      <form
        className="box rounded-2"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="border Auth_active">
          <Link
            to="/login"
            className={`${location.pathname === "/login" ? "Login_active" : "Active_any"
              }`}
          >
            <div>Login</div>
          </Link>
          <Link
            to="/signup"
            className={`${location.pathname === "/signup" ? "Signup_active" : "Active_any"
              }`}
          >
            <div>Signup</div>
          </Link>
        </div>
        {/* <p className="text-dark"> Please enter your login email and password!</p> */}

        <div className="">
          <input
            type="email"
            id="validationCustom01"
            className="input_Text"
            {...register("email", { required: true })}
            placeholder="name@example.com"
          />
          {errors.email && <div className="text-danger">Email is required</div>}
        </div>
        <div className="">
          <input
            type="email"
            id="validationCustom01"
            className="input_Text"
            {...register("email", { required: true })}
            placeholder="name@example.com"
          />
          {errors.email && <div className="text-danger">Email is required</div>}
        </div>

        {/* //////////////////////////////////////////////////////////// */}
        <Link className=" fw-bold text-dark forgot text-dark" to="/forget">
          Forgot password?
        </Link>
        <button type="submit" className="mt-3 w-100 btn btn-outline-warning">
          Submit
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

export default Login;
