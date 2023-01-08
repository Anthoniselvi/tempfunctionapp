import React, { useState, useEffect } from "react";
import "./style.css";
import Footer from "./Footer";
import { AiOutlineArrowLeft, AiFillEdit } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { GrAddCircle, GrNewWindow } from "react-icons/gr";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

export default function EventListNew() {
  const navigate = useNavigate();
  const [eventsList, setEventsList] = useState([]);
  const [entries, setEntries] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [show, setShow] = useState(false);
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");

  const getTotalAmount = (eventId) => {
    const totalAmount = entries
      .filter((entry) => entry.eventId === eventId)
      .map((entry) => parseInt(entry.amount))
      .reduce((acc, value) => acc + +value, 0);

    return totalAmount;
  };

  const gettotalGiftforEvent = (eventId) => {
    return entries.filter(
      (entry) => entry.eventId === eventId && entry.gift !== ""
    ).length;
  };

  const navigateToAddNewEvent = (e) => {
    e.stopPropagation();
    navigate("/event/new");
  };

  const navigateToAddNewEntry = (e, eventId) => {
    e.stopPropagation();
    navigate(`/entry/new?event=${eventId}`);
  };
  const navigateToEntryList = (id) => {
    navigate(`/entryList?event=${id}`);
  };

  const moveToFrontPage = () => {
    navigate("/frontpage");
  };

  const fetchAllEvents = () => {
    axios.get("http://localhost:2023/events").then((response) => {
      // console.log(response);
      console.log(response.data);
      setUpdatedEvents(response.data);
    });
  };

  // const fetchAllEntries = () => {
  //   axios.get("http://localhost:2023/entries").then((response) => {
  //     // console.log(response);
  //     console.log(response.data);
  //     setUpdatedEntries(response.data);
  //   });
  // };

  const setUpdatedEvents = (responseData) => {
    const eventsList = responseData.map((singleEvent) => {
      return {
        id: singleEvent.id,
        name: singleEvent.name,
        place: singleEvent.place,
        date: singleEvent.date,
      };
    });

    setEventsList(eventsList);
  };

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

  useEffect(() => {
    fetchAllEvents();
    // fetchAllEntries();
  }, []);

  const editEvent = (e, id) => {
    e.stopPropagation();
    navigate(`/event?event=${id}`);
  };

  const deleteEvent = (e, eventId) => {
    e.stopPropagation();
    // console.log(parseInt(idToDelete));
    console.log(eventId);
    axios.delete(`http://localhost:2023/events/${eventId}`).then((response) => {
      console.log(response);
      fetchAllEvents();
      navigate("/eventslist");
    });

    // deleteEntries(eventId);
  };

  return (
    <div className="event_container">
      <div className="event_header">
        <AiOutlineArrowLeft
          className="event_header_icon"
          onClick={moveToFrontPage}
        />
        <h1 className="event_title">Moi Registry</h1>
        {/* <BsPersonCircle className="event_header_icon" /> */}
        <AiOutlineLogout className="event_header_icon" />
      </div>
      <div className="event_content">
        <div className="eventlist_container">
          {eventsList.length > 0 && (
            <>
              {eventsList.map((singleEvent) => (
                <div
                  className="event-inner-box"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Navigating to entry list");
                    navigateToEntryList(singleEvent.id);
                  }}
                >
                  <div className="event_head_name">
                    <h4>{singleEvent.name}</h4>
                    <HiDotsVertical
                      className="event_icon_dropdown"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("set show clicked..");
                        setSelectedEvent(singleEvent.id);
                        setShow((show) => !show);
                      }}
                    />
                  </div>
                  {singleEvent.id === selectedEvent && show ? (
                    <div className="event_dropdown">
                      <p
                        onClick={(e) =>
                          navigateToAddNewEntry(e, singleEvent.id)
                        }
                      >
                        Add Entry
                      </p>
                      <p onClick={(e) => editEvent(e, singleEvent.id)}>Edit</p>
                      <p onClick={(e) => deleteEvent(e, singleEvent.id)}>
                        Delete
                      </p>
                      {/* <GrNewWindow
                        onClick={() => navigateToEntryList(event.id)}
                      />
                      <AiFillEdit onClick={() => editEvent(event.id)} />
                      <MdDelete onClick={() => deleteEvent(event.id)} /> */}
                    </div>
                  ) : null}

                  <table className="event-table">
                    <tr>
                      <td>Total Amount</td>
                      <td>
                        Rs. <span>{getTotalAmount(singleEvent.id)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Total No.of Gift</td>
                      {/* <td>{getTotalGift(event.id)}</td> */}
                      <td>{gettotalGiftforEvent(singleEvent.id)}</td>
                    </tr>
                  </table>
                </div>
              ))}
            </>
          )}

          {eventsList.length < 1 && (
            <>
              <p>No Events found</p>

              <button
                className="addevent-button"
                onClick={navigateToAddNewEvent}
              >
                Add New Event
              </button>
            </>
          )}
        </div>
      </div>
      <div className="footer_container">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={navigateToAddNewEvent} />
          </Fab>
          {/* <Fab color="secondary" aria-label="edit">
            <EditIcon />
          </Fab> */}
        </Box>
        {/* <AiFillHome />
        <GrAddCircle onClick={navigateToAddNewEvent} />
        <BiMenu /> */}
      </div>
    </div>
  );
}
