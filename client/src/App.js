import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Form from "./components/Form";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={Form} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;