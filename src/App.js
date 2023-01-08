import React from "react";
import FrontPage from "./Components/FrontPage";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import EventListNew from "./Components/EventListNew";
import EventFormNew from "./Components/EventFormNew";
import EntryFormNew from "./Components/EntryFormNew";
import EntryListNew from "./Components/EntryListNew";
import Edit from "./Components/Edit";
import Event from "./Components/Event";
import DataTable from "./Components/EditEntry";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<FrontPage />} />
            <Route path="frontpage" element={<FrontPage />} />

            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />

            <Route path="eventslist" element={<EventListNew />} />
            <Route path="event/new" element={<EventFormNew />} />
            <Route path="entrylist" element={<EntryListNew />} />
            <Route path="entry/new" element={<EntryFormNew />} />
            <Route path="edit" element={<Edit />} />
            <Route path="event" element={<Event />} />
            <Route path="editEntry" element={<DataTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
