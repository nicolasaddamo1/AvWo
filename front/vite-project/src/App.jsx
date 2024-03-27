import React from "react"
import Register from "./view/Register/Register.jsx"
import { Routes, Route} from "react-router-dom"
import Home from "./view/Home/Home.jsx"
import "./App.css"
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Register" element={<Register/>} ></Route>
    </Routes>
    </>
  )
  
}

export default App
