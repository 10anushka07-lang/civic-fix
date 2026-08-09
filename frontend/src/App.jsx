import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';

import Login from "./pages/Login";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import IssueMap from "./pages/IssueMap";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/issue-map" element={<IssueMap />} />
       
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
