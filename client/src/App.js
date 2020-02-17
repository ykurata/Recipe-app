import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Form from "./components/Form";
import Update from "./components/Update";
import List from "./components/List";
import MyRecipes from "./components/MyRecipes";
import Detail from "./components/Detail";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/create" component={Form} />
        <PrivateRoute path="/update/:id" component={Update} />
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/list" component={List} />
        <Route path="/my-recipes" component={MyRecipes} />
        <Route path="/:id" component={Detail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;