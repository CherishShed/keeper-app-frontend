import { useEffect, useState } from "react";
import "../auth.css";
import {
  
  FormControl,
  InputAdornment,
  TextField,
  
} from "@mui/material";
import { LoadingButton } from '@mui/lab'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import { IconButton } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [toastText, settoastText] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate()
const [loading, setLoading] = useState(false)
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (toastText === "User not found" || toastText === "Incorrect Password") {
      toast.error(toastText, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        pauseOnHover: false,
        autoClose: 1000,
        theme: "light",
      });
    } else if (toastText === "Login Success") {
      toast.success(toastText, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        pauseOnHover: false,
        autoClose: 1000,
        theme: "light",
      });
    } else {
       toast.error(toastText, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        pauseOnHover: false,
        autoClose: 1000,
        theme: "light",
      });
    }

    settoastText("");
  }, [toastText]);
  useEffect(() => {

  })
  function handleButton(ev) {
    console.log(document.getElementById("usernameInput").value)
    document.getElementById("loginPage").click()
    handleCheck()
    const passLength = formData.password.length;
    const usernameLength = formData.username.length;
    const offset = ev.target.offsetLeft;
    console.log(passLength, offset);
    let displace = "0px";
    if (passLength < 8 || usernameLength < 8) {
      if (offset <= 98) {
        displace = "100px";
      } else if (offset > 96) {
        displace = "-100px";
      }
      ev.target.setAttribute("disabled", true);
    } else {
      ev.target.removeAttribute("disabled");
    }
    ev.target.style.left = displace;
  }
  function handleCheck() {
    const passLength = formData.password.length;
    const usernameLength = formData.username.length;
    if (passLength < 8 || usernameLength < 8) {
      document.getElementsByClassName("loginButton")[0].style.backgroundColor = "rgb(112, 41, 29)";
    } else {
      document.getElementsByClassName("loginButton")[0].style.backgroundColor = " rgb(24, 100, 65)";
    }
  }

  function handleSubmit(event) {
    console.log("here");
    event.preventDefault();
    setLoading(true)
    axios.post("https://keeper-backend-psi.vercel.app/login", formData).then((result) => {
      console.log(result);
      settoastText(result.data.message);
      setTimeout(() => {
        if (result.data.success) {
          setLoading(false)
          localStorage.setItem("token", result.data.token);
          navigate("/");
        }
      }, 500);
    }).catch(()=>{
      setLoading(false)
      settoastText('An error occured')

    })
  }
  window.addEventListener("load", () => {
    document.getElementById("usernameInput").focus();
  })
  return (
    <div>
      <ToastContainer />
      <div className="loginForm">
        <div className="login" id="loginPage">
          <img
            src="pexels-mockupbee-12039670.jpg"
            className="backImg"
            alt="back img"
          />
          <img
            src="Screenshot_2023-06-15_114647-removebg-preview.png"
            alt="welcome"
            className="welcome-img"
          />
          <FormControl
            component="form"
            className="formInput"
            gap={2}
            onSubmit={handleSubmit}
          >
            <div>
              <img
                alt="logo"
                src="Screenshot_2023-06-15_113137-removebg-preview.png"
                className="logo"
              />
              <p style={{ fontFamily: "Indie Flower", fontSize: "20px" }}>
                Welcome To Your Note Assistant
              </p>
            </div>
            <TextField
              fullWidth
              style={{ fontFamily: "Indie Flower", fontSize: "20px" }}
              variant="standard"
              label="Email"
              type="email"
              color="warning"
              name="username"
              id="usernameInput"
              autoComplete="off"
              autoFocus={false}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              className="form-input-field"
              onChange={(e) => {
                document.querySelector(".loginButton").style.left = "0px";
                document
                  .querySelector(".loginButton")
                  .removeAttribute("disabled");
                setFormData({ ...formData, username: e.target.value });
                handleCheck();
              }}
              value={formData.username}
              key={1}
            />
            <TextField
              style={{ fontFamily: "Indie Flower", fontWeight: "bold" }}
              key={2}
              name="password"
              autoComplete="off"
              autoFocus={true}
              
              onChange={(e) => {
                document.querySelector(".loginButton").style.left = "0px";
                document
                  .querySelector(".loginButton")
                  .removeAttribute("disabled");
                setFormData({ ...formData, password: e.target.value });
                handleCheck();
              }}
              value={formData.password}
              variant="standard"
              label="Password"
              type={showPassword ? "text" : "password"}
              color="warning"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EnhancedEncryptionIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className="form-input-field password"
            />
            <p className="signup-text">
              Do not have an account?{" "}
              <a className="signup-link" href="/register">
                Sign Up
              </a>
            </p>
            <LoadingButton
            className="loginButton"
              type="submit"
              variant="contained"
              size="large"
              onMouseEnter={(e) => handleButton(e)}
              style={{ backgroundColor: "rgb(121, 68, 59)" }}
              loading={loading}
            >
              <span>Login</span>
            </LoadingButton>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default Login;
