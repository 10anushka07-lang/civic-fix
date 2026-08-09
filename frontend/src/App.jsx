import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import ContactUs from "./pages/ContactUs";
import IssueMap from "./pages/IssueMap";
import Feedback from "./pages/Feedback";
import Voting from "./pages/voting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/issue-map" element={<IssueMap />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/voting" element={<Voting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;