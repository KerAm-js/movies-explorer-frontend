import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { TOKEN } from "../../utils/localStorageConstants";

function ProtectedRoute({ component: Component, ...componentProps }) {

  const {user} = useContext(UserContext);
  const token = localStorage.getItem(TOKEN);

  return (
    <>
      {
        user.email && user.name && token
          ? <Component {...componentProps} />
          : <Navigate to="/" />
      }
    </>       
  )
}

export default ProtectedRoute;