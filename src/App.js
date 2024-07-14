import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NoteContext from "./context/notes/noteContext";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState({
    msg: "",
    type: "",
  });
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert({msg: "", type: ""});
    }, 1500);
  }
  return (
    // <>
    <NoteState>
    <Router>
      <Navbar />
      <Alert message={alert.msg} type={alert.type}/>
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert}/>}>
          {/* <Route path="messages" element={<DashboardMessages />} /> */}
        </Route>
        <Route exact path="about" element={<About/>} />
        <Route exact path="login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="signup" element={<Signup showAlert={showAlert}/>} />
      </Routes>
      </div>
    </Router>
    </NoteState>
    // </>
  );
}

export default App;
