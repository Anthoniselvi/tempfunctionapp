import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import { AiOutlineArrowLeft, AiFillEdit } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsPersonCircle, BsFillPersonFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function EntryFormNew() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");

  const [entries, setEntries] = useState();
  // const [totalEntries, setTotalEntries] = useState(setUpdatedEntries());
  const [personName, setPersonName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [gift, setGift] = useState("");
  const [selected, setSelected] = useState("amount");

  // const setUpdatedEntries = (responseData) => {
  //   const entriesList = responseData.map((singleEntry) => {
  //     return {
  //       id: singleEntry.id,
  //       personName: singleEntry.personName,
  //       city: singleEntry.city,
  //       amount: singleEntry.amount,
  //       gift: singleEntry.gift,
  //       eventId: singleEntry.eventId,
  //     };
  //   });

  //   setEntries(entriesList);
  // };
  const handleSubmitEntry = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:2023/entries", {
        personName: personName,
        city: city,
        amount: amount,
        gift: gift,
        eventId: eventId,
      })
      .then((response) => {
        console.log(response);
        navigate(`/entryList?event=${eventId}`);
      });

    setPersonName("");
    setCity("");
    setAmount("");
    setGift("");

    // setEntries(setUpdatedEntries());
    // navigate(`/entryList?event=${eventId}`);
  };

  const moveToEventListPage = () => {
    navigate("/eventslist");
  };

  const navigateToEntryForm = () => {
    navigate(`/entry/new?event=${eventId}`);
  };

  return (
    <div className="entry_container">
      <div className="entry_header">
        <AiOutlineArrowLeft
          className="entry_header_icon"
          onClick={moveToEventListPage}
        />
        <h1>Entry</h1>
        <BsPersonCircle className="event_header_icon" />
      </div>
      <div className="entry_content">
        <form className="entry_form" onSubmit={handleSubmitEntry}>
          <h1 className="entry-title">Add New Entry</h1>
          <input
            className="entry_inputs"
            type="text"
            name="name"
            required
            onChange={(e) => setPersonName(e.target.value)}
            value={personName}
            placeholder="Person Name"
          />
          <input
            className="entry_inputs"
            type="text"
            required
            name="city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="City Name"
          />
          <div className="entry_radio_container">
            <label>Type of Presentation: </label>
            <div className="entry_radio_inputs">
              <div className="row">
                <input
                  className=""
                  name="radio"
                  type="radio"
                  value="amount"
                  defaultChecked={selected === "amount"}
                  onChange={(e) => setSelected(e.target.value)}
                />

                <label htmlFor="amount">Amount</label>
              </div>
              {/* {selected === "amount" && ( */}
              <input
                className="entry_inputs"
                type="number"
                required
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                placeholder="Amount"
              />
              {/* )} */}
            </div>
            <div className="entry_radio_inputs">
              <div className="row">
                <input
                  name="radio"
                  type="radio"
                  value="gift"
                  defaultChecked={selected === "gift"}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label htmlFor="gift">No. of Gift</label>
              </div>
              {selected === "gift" && (
                <>
                  {/* <input
                    className="entry_inputs"
                    type="number"
                    required
                    name="gift"
                    onChange={(e) => setGift(e.target.value)}
                    value={gift}
                    placeholder="No. of Gift"
                  /> */}
                  <textarea
                    className="entry_form_comments "
                    onChange={(e) => setGift(e.target.value)}
                    value={gift}
                    placeholder="Type comments if any"
                  />
                </>
              )}
            </div>
          </div>
          {/* <input
            className="entry_inputs"
            type="number"
            required
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="Amount"
          /> */}
          {/* <input
            className="entry_inputs"
            type="number"
            required
            name="gift"
            onChange={(e) => setGift(e.target.value)}
            value={gift}
          /> */}
          <button className="entry_button" type="submit">
            Add Entry
          </button>
        </form>
      </div>
      <div className="footer_container">
        <AiFillHome />
        <GrAddCircle onClick={navigateToEntryForm} />
        <BiMenu />
      </div>
    </div>
  );
}
