import React from "react";
import { Route, Redirect } from "react-router-dom";


//Protected Route = when a user is NOT logged in
const ProtectedRoute = ({ auth: userUID, render: RenderComponent, new: newUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        props =>
          (userUID !== null) ? (
            (userUID !== "no-log") ? (
              (newUser) ? (
                <Redirect to={"/setup"} />
              ) : (
                <Redirect to={"/home"} />
              )
            ) : (
              <RenderComponent {...props} />
            ) 
          ) : (
            <div>
                Loading....
            </div>
          )
      }
      />
  );
};

export default ProtectedRoute