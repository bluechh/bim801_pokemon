import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import ImageAppContainer from './container/ImageOps';

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
function PrivateRoute({isAuthenticated, children, ...rest}) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuthenticated ? (
            children
          ) : (
            <Navigate
              to={{
                pathname: "/login/",
                state: { from: location }
              }}
            />
            // <Navigate to="/login/" replace state={from: location} />
          )
        }
      />
    );
  }

function Urls(props) {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login/" element = {<Login {...props} />} />
                    <Route path="/" element = {<ImageAppContainer {...props}/>} />
                    {/* <PrivateRoute path="/" isAuthenticated={props.isAuthenticated} element = {<Home {...props}/>} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default Urls;