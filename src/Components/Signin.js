import React, { useState, useEffect } from "react";
import "./style.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { auth, google, facebook } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import SigninValidation from "./SigninValidation";

function Signin() {
  const navigate = useNavigate();
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const handleChangeSignin = (event) => {
    setSigninData({
      ...signinData,
      [event.target.name]: event.target.value,
    });
  };
  const login = async (provider) => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };
  const handleSubmitSignin = async (e) => {
    e.preventDefault();
    setErrors(SigninValidation(signinData));
    setDataIsCorrect(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/MainItems");
    } catch (err) {
      setErr(true);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      alert("login successfully");
      navigate("/eventslist");
    }
  }, [errors]);

  function moveToFrontPage() {
    navigate("/FrontPage");
  }

  return (
    <div className="signin_container">
      <div className="signin_top_container">
        <div className="signin_top_navbar">
          <AiOutlineArrowLeft onClick={moveToFrontPage} />
          <p className="signin_top_head">Login</p>
        </div>
        <h1 className="signin_title">Sign In</h1>
        <p className="signin_para">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
      <form className="signin_bottom_container" onSubmit={handleSubmitSignin}>
        <input
          className="signin_input"
          type="email"
          placeholder="Enter Email ID"
          onChange={handleChangeSignin}
          name="email"
          value={signinData.email}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          className="signin_input"
          type="password"
          placeholder="Enter Password"
          onChange={handleChangeSignin}
          name="password"
          value={signinData.password}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <div className="signin_forget_para">
          <a href="" className="sigin_forget">
            <p>Forget Password?</p>
          </a>
        </div>
        <button className="signin_sign_button">Sign In</button>
      </form>
      <div className="social-login">
        <div className="signin_google" onClick={() => login(google)}>
          <FcGoogle />
          <p>Continue with Google</p>
          <AiOutlineArrowRight />
        </div>
        <div className="signin_facebook" onClick={() => login(facebook)}>
          <BsFacebook />
          <p>Continue with Facebook</p>
          <AiOutlineArrowRight />
        </div>
      </div>
    </div>
  );
}

export default Signin;
