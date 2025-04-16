
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdmissionForm from "./Components/AdmissionForm";
import ComplaintList from "./Components/ComplaintList";
import MainPage from "./Components/Mainpage";

function App() {
  return (
    <div>
        <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Complaint" element={<AdmissionForm />} />
        <Route path="/data" element={<ComplaintList />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
