import { Container } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";
import { Outlet, Route, Routes,Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/navbar.component";
import Register from "./components/register/register.component";

function App() {

  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar></Navbar>}/>
        <Route path="/register" element={<Register></Register>}/>

     
      </Routes>
      
      
    </div>
  );
}

export default App;
