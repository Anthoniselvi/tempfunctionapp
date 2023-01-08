import React from "react";
import "./style.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function moveToFrontPage() {
    navigate("/FrontPage");
  }
  return (
    <div className="header_container">
      <AiOutlineArrowLeft onClick={moveToFrontPage} />
      <BsPersonCircle />
    </div>
  );
}

export default Header;
