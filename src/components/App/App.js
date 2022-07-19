import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { TOKEN } from "../../utils/localStorageConstants";
import { getUserInfo } from "../../utils/MainApi";


function App() {

  const [user, setUser] = useState({
    email: "",
    name: ""
  });

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      getUserInfo({ token })
        .then(res => {
          const { email, name } = res;
          setUser({ email, name });
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="App">
        <Routes>
          <Route index path="/" element={<Main />} />
          <Route 
            path="/movies"
            element={
              user.email && user.name 
                ? <Movies />
                : <Navigate to="/signin" />
            }
          />
          <Route 
            path="/saved-movies"
            element={
              user.email && user.name  
                ? <SavedMovies />
                : <Navigate to="/signin" />
            }
          />
          <Route 
            path="/profile"
            element={
              user.email && user.name  
                ? <Profile/>
                : <Navigate to="/signin" />
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
