import React from "react";
import UserContext from "./UserContext";

export default UserState = ({ children }) => {
    return (
        <UserContext.Provider>
            {children}
        </UserContext.Provider>
    )
}