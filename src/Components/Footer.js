import React from "react";
import "./style.css";
import { BiMenu } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  function moveToAddNewEvent() {
    // navigate("/AddNewEvent");
  }
  return (
    <div className="footer_container">
      <AiFillHome />
      <GrAddCircle onClick={moveToAddNewEvent} />
      <BiMenu />
    </div>
  );
}

export default Footer;
