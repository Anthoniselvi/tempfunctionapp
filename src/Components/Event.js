import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineLogout } from "react-icons/ai";
import axios from "axios";

export default function Event() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");

  const [name, setName] = useState();
  const [place, setPlace] = useState();
  const [eventDate, setEventDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:2023/events/", {
        id: parseInt(eventId),
        name: name,
        place: place,
        date: eventDate,
      })
      .then((response) => {
        console.log(response);
        navigate("/eventslist");
      });
  };
  useEffect(() => {
    axios.get(`http://localhost:2023/events/${eventId}`).then((response) => {
      console.log(response);
      setName(response.data.name);
      setPlace(response.data.place);
      // setEventDate(response.data.date);
    });
  }, []);

  const moveToFrontPage = () => {
    navigate("/eventslist");
  };

  return (
    <div className="event_content">
      <div className="event_header">
        <AiOutlineArrowLeft
          className="event_header_icon"
          onClick={moveToFrontPage}
        />
        <h1>Edit Event</h1>
        {/* <BsPersonCircle className="event_header_icon" /> */}
        <AiOutlineLogout className="event_header_icon" />
      </div>
      <form className="event_form" onSubmit={handleSubmitEvent}>
        {/* <h1 className="event-title">Edit Event</h1> */}
        <input
          className="event_inputs"
          type="text"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Event Name"
        />
        <input
          className="event_inputs"
          type="text"
          required
          name="place"
          onChange={(e) => setPlace(e.target.value)}
          value={place}
          placeholder="Place"
        />

        <input
          className="event_inputs"
          type="date"
          required
          name="date"
          onChange={(e) => setEventDate(e.target.value)}
          value={eventDate}
        />
        <button type="submit" className="event_edit_button">
          Edit
        </button>
      </form>
    </div>
  );
}
