import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NoteContext from "./context/notes/noteContext";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    // <>
    <NoteState>
    <Router>
      <Navbar />
      <Alert message="Changes Saved"/>
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Home />}>
          {/* <Route path="messages" element={<DashboardMessages />} /> */}
        </Route>
        <Route exact path="about" element={<About />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
    // </>
  );
}

export default App;
