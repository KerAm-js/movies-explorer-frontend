import React, { useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";


function App() {

  const [user, setUser] = useState({
    email: "",
    name: ""
  });

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="App">
        <Routes>
          <Route index path="/" element={<Main />} />
          <Route
            path="/movies"
            element={<Movies />}
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies />
            }
          />
          <Route 
            path="/profile" 
            element={
              <Profile />
            } 
          />
          <Route 
            path="/signin" 
            element={
              <LogIn />
            } 
          />
          <Route
            path="/signup"
            element={
              <Register />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
    
  );
}

export default App;
