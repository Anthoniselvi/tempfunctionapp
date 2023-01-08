import React from "react";
import "./style.css";
import family from "./family.jpg";
import Signin from "./Signin";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const navigate = useNavigate();

  function moveToSignin() {
    navigate("/Signin");
  }
  function moveToSignup() {
    navigate("/Signup");
  }
  return (
    <div className="front_container">
      <div className="front_top_container"></div>
      <div className="front_bottom_container">
        <h2>Welcome</h2>
        <p className="front_para">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet,
          praesentium distinctio.consectetur adipisicing elit.
        </p>
        <div className="front_buttons">
          <button className="signin_button" onClick={moveToSignin}>
            Sign In
          </button>
          <button className="signup_button" onClick={moveToSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
