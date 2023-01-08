// import { Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import EntryFormNew from "./EntryFormNew";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const entryId = searchParam.get("entry");

  // const [totalEntries, setTotalEntries] = useState(getTotalDatafromEntry());

  // const [editEntry, setEditEntry] = useState(getDataforSingleEntry(entryId));
  const [personName, setPersonName] = useState();
  const [city, setCity] = useState();
  const [amount, setAmount] = useState();
  const [gift, setGift] = useState();
  const [selected, setSelected] = useState("amount");

  const handleSubmitEditEntry = (e) => {
    e.preventDefault();
    // let newEdit = {
    //   id: editEntry.id,
    //   personName,
    //   city,
    //   amount,
    //   gift,
    //   eventId: editEntry.eventId,
    // };
    // console.log(newEdit);

    // const updatedtotalEntry = totalEntries.map((singleEntry) => {
    //   if (parseInt(singleEntry.id) === parseInt(entryId)) {
    //     return newEdit;
    //   } else {
    //     return singleEntry;
    //   }
    // });

    // localStorage.setItem("entries", JSON.stringify(updatedtotalEntry));
    // console.log("updated total entry : " + JSON.stringify(updatedtotalEntry));
    // navigate(`/entrylist?event=${editEntry.eventId}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:2023/entries/${entryId}`).then((response) => {
      console.log(response);
      setPersonName(response.data.personName);
      setCity(response.data.city);
      setAmount(response.data.amount);
      setGift(response.data.gift);
    });
  }, []);
  return (
    <div className="editentry_container">
      {/* <div className="entry_header">
        <AiOutlineArrowLeft
          className="entry_header_icon"
          onClick={moveToEventListPage}
        />
        <h1>Entry</h1>
        <BsPersonCircle className="event_header_icon" />
      </div> */}
      <div className="entry_content">
        <form className="entry_form" onSubmit={handleSubmitEditEntry}>
          <h1 className="entry-title">Edit Entry</h1>
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
          <button className="entry_button" type="submit">
            Edit
          </button>
        </form>
      </div>
      {/* <div className="footer_container">
        <AiFillHome />
        <GrAddCircle onClick={navigateToEntryForm} />
        <BiMenu />
      </div> */}
    </div>
  );
}

export default Edit;
