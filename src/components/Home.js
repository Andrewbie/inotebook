import React from "react";
// import { useContext } from "react";
// import noteContext from '../context/notes/noteContext'
import Notes from '../components/Notes'
// import Addnote from "./Addnote";
const Home = (props) => {
  const { showAlert } = props;
  return (
    <>
      <div className="row">
      <Notes showAlert={showAlert}/>
      </div>
    </>
  );
};

export default Home;
