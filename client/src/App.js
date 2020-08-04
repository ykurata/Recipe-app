import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { Provider } from "react-redux";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Form from "./pages/Form";
import Update from "./pages/Update";
import ProfileForm from "./pages/ProfileForm";
import ProfileDetail from "./pages/ProfileDetail";
import List from "./pages/List";
import MyRecipes from "./pages/MyRecipes";
import Detail from "./pages/Detail";
import Image from "./pages/Image";
import PrivateRoute from "./components/PrivateRoute";

import store from './store';

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/create" component={Form} />
          <PrivateRoute path="/image/:id" component={Image} />
          <PrivateRoute path="/update/:id" component={Update} />
          <PrivateRoute path="/my-recipes" component={MyRecipes} />
          <PrivateRoute path="/profile/:id" component={ProfileDetail} />
          <PrivateRoute path="/profile" component={ProfileForm} />
          <Route exact path="/" component={Landing} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/list" component={List} />
          <Route path="/:id" component={Detail} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;