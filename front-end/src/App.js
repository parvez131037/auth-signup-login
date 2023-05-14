import React from 'react';
import Login from './Components/Login.jsx';
import Register from "./Components/Register.jsx";
import Homepage from './Components/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import FreeComponent from './Components/FreeComponent.jsx';


const App = () => {
  return (
    <>
<BrowserRouter>
  <Routes>
      {/* <Route path='/' element={<Homepage/>}></Route> */}
      <Route path="/" element={<ProtectedRoute><Homepage/></ProtectedRoute>}></Route>
      <Route path='/free' element={<FreeComponent/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
  </Routes>
</BrowserRouter>
    </>
  )
}

export default App
