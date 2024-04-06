import React from "react";
// import { useContext } from "react";
// import noteContext from '../context/notes/noteContext'
import Notes from '../components/Notes'
import Addnote from "./Addnote";
const Home = () => {
  
  return (
    <>
      <div className="row">
      <Notes/>
      </div>
    </>
  );
};

export default Home;
