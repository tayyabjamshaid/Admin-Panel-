import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/Login.css";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "reactstrap";
import logo from "assets/img/da.jpeg";
import { fetchUsers } from "Reducers/userAuth";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo, error } = useSelector((state) => state.authData);

  const submitForm = (e) => {
    e.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      toast.error("Please Enter Your Email");
    } else if (!password) {
      toast.error("Please Enter Your Password");
    } else {
      if (re.test(email)) {
        if (password.length >= 4) {
          let emailObject = { email, password };
          dispatch(fetchUsers(emailObject));
        } else {
          toast.error("Password length must be greater than 3");
        }
      } else {
        toast.error("Email must be in Email Pattern");
      }
    }
  };
  useEffect(() => {
    if (userInfo) {
      history.push("/admin/tables");
    }
  }, [userInfo, history]);
  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <div className="text-center">
              <img src={logo} height="75px" width="85px" />
            </div>
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <input
                style={{ color: "black" }}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <input
                style={{ color: "black" }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3 text-right">
              <Button
                className="btn-fill "
                color="primary"
                style={{
                  "width": "140px",
                  "height": "40px",
                }}
                onClick={submitForm}
              >
                Submit
              </Button>
            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
