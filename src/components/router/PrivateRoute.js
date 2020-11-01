import React from "react";
import { Route, Redirect } from "react-router-dom";

//Private Route is when the user IS logged in
const PrivateRoute = ({ auth: userUID, render: RenderComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        props =>
          (userUID === null) ? (
            <div>
                Loading....
            </div>
          ) : (
            (userUID === 'no-log') ? (
              <Redirect to={"/login"}/>
            ) : (
              <RenderComponent {...props} />              
            )
          )
      }
      />
  );
};

export default PrivateRoute