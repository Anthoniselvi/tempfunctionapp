import React, { useState, useEffect } from "react";
import FrontPage from "./FrontPage";
import Signin from "./Signin";
import "./style.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Validation from "./Validation";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const moveToFrontPage = () => {
    navigate("/frontpage");
  };
  const updateHandleChange = (event) => {
    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    setErrors(Validation(signupData));
    setDataIsCorrect(true);

    const fullname = e.target[0].value;
    const email = e.target[1].value;
    const phone = e.target[2].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      alert("signup successfully");
      navigate("/eventslist");
    }
  }, [errors]);
  return (
    <div className="signup_container">
      <div className="signup_top_container">
        <div className="signup_top_navbar">
          <AiOutlineArrowLeft onClick={moveToFrontPage} />
          <p className="signup_top_head">Register</p>
        </div>
        <h1>Sign Up</h1>
        <p className="signup_para">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="signup_bottom_container">
        <form className="signup_form" onSubmit={handleSubmitSignup}>
          <div className="signup_input_container">
            <label className="signup_label">Full Name</label>
            <input
              className="signup_input"
              type="text"
              name="fullname"
              value={signupData.fullname}
              onChange={updateHandleChange}
            />
            {errors.fullname && <p className="error">{errors.fullname}</p>}
          </div>
          <div className="signup_input_container">
            <label className="signup_label">Email</label>
            <input
              className="signup_input"
              type="email"
              name="email"
              value={signupData.email}
              onChange={updateHandleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="signup_input_container">
            <label className="signup_label">Mobile Number</label>
            <input
              className="signup_input"
              type="text"
              name="phone"
              value={signupData.phone}
              onChange={updateHandleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="signup_input_container">
            <label className="signup_label">Create Password</label>
            <input
              className="signup_input"
              type="password"
              name="password"
              value={signupData.password}
              onChange={updateHandleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button className="signup_sign_button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
