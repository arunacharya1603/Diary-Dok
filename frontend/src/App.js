import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllMemories from "./pages/AllMemories";
import CompletedDairies from "./pages/CompletedDairies";
import IncompletedDairies from "./pages/IncompletedDairies";
import ImportantMemories from "./pages/ImportantMemories";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useSelector , useDispatch} from "react-redux";
import {login} from "./store/auth";


const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(login());
    }
   else if (!isLoggedIn) {
      navigate("/signup");
    }
  }, [isLoggedIn, dispatch, navigate]);

  return (
    <div className="bg-custom-gradient lg:p-4 text-black h-screen relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllMemories />} />
          <Route path="/completeddairies" element={<CompletedDairies />} />
          <Route path="/incompleteddairies" element={<IncompletedDairies />} />
          <Route path="/importantmemories" element={<ImportantMemories />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
