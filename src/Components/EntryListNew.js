import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { AiOutlineArrowLeft, AiFillEdit } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsPersonCircle, BsFillPersonFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import Avatar from "react-avatar";
import axios from "axios";

export default function EntriesList() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");

  // const [eventsList, setEventsList] = useState();

  const [entries, setEntries] = useState([]);
  // const [totalAmount, setTotalAmount] = useState();

  function onChangeHandle(e) {
    console.log("e.target.value", e.target.value);
    if (e.target.value === "") {
      window.location.reload(true);
      const tempArr = entries;
      setEntries(tempArr);
      return;
    }
    const searchResult = entries.filter((entry) =>
      entry.personName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setEntries(searchResult);
  }

  const totalAmount = entries
    .map((entry) => entry.amount)
    .reduce((acc, value) => acc + +value, 0);

  const totalGift = entries.filter((entry) => entry.gift !== "").length;

  const navigateToEntryForm = () => {
    navigate(`/entry/new?event=${eventId}`);
  };

  const moveToEventListPage = () => {
    navigate("/eventslist");
  };

  const editEntry = (id) => {
    navigate(`/edit?entry=${id}`);
  };

  const deleteEntry = (id) => {
    const entryArray = entries.filter((item) => {
      return item.id !== id;
    });
    setEntries(entryArray);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2023/entries/all/${eventId}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setEntries(response.data);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:2023/entries/total/${eventId}`)
  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.data);
  //       setTotalAmount(response.data);
  //     });
  // }, []);

  return (
    <div className="entry_container">
      <div className="entry_header">
        <AiOutlineArrowLeft
          className="entry_header_icon"
          onClick={moveToEventListPage}
        />
        <h1 className="entry-title">Entry</h1>
        {/* {eventsList.map((eventId) => (
          <h1 className="entry-title">{eventId.name}</h1>
        ))} */}
        {/* <h1>Entry</h1> */}
        <BsPersonCircle className="event_header_icon" />
      </div>

      <div className="entry_content">
        <div className="entry_searchbar">
          <BiSearch />
          <input
            type="text"
            placeholder="Search by Person Name"
            className="entry_searchbar_input"
            // value={searchName}
            onChange={onChangeHandle}
          />
        </div>
        {entries.length > 0 && (
          <>
            <div className="entry-inner-box">
              {/* onClick={moveToEntry} */}
              {/* <div className="entry_head_name"> */}
              <table className="entry-table">
                <thead>
                  <tr>
                    <th>Person Name</th>
                    <th>Amount</th>
                    <th>Gift</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <Avatar
                          name={entry.personName}
                          size="35"
                          round={true}
                          maxInitials="1"
                        />
                        {entry.personName}
                      </td>
                      <td>{entry.amount}</td>
                      <td>{entry.gift}</td>
                      <td>
                        <AiFillEdit onClick={() => editEntry(entry.id)} />
                      </td>
                      <td>
                        <MdDelete onClick={() => deleteEntry(entry.id)} />
                      </td>
                    </tr>
                  ))}

                  <tr className="total-entry">
                    <td>Total</td>
                    <td>{totalAmount}</td>
                    <td>{totalGift}</td>
                  </tr>
                </tbody>
              </table>
              {/* </div> */}
            </div>
          </>
        )}

        {entries.length < 1 && <p>No Entries found</p>}
        <button className="addentry-button" onClick={navigateToEntryForm}>
          Add New Entry
        </button>
      </div>

      <div className="footer_container">
        <AiFillHome />
        <GrAddCircle onClick={navigateToEntryForm} />
        <BiMenu />
      </div>
    </div>
  );
}
