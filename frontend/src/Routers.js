import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Accounts/Login";
import Logout from "./components/Accounts/Logout";
import Signup from "./components/Accounts/Signup";
import HomeDrawer from "./components/Home/HomeDrawer";
import Dashboard from "./components/Accounts/Profile/Dashboard";
import EditUser from "./components/Accounts/Profile/EditUser";
import Appbar from "./components/CustomComponents/Appbar";
import CoursePage from "./components/Courses/CoursePage";
import { axiosInstance } from "./Axios";
import AddCourse from "./components/Accounts/Profile/master/AddCourse";
import Basket from "./components/Accounts/Basket/Basket";

export default function Routers() {
  return (
    <>
      <Router>
        <Appbar />
        <Switch>
          <Route exact path="/" render={(props) => <HomeDrawer {...props} />} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/login" component={Login} />

          <Route exact path="/signup" component={Signup} />

          <Route exact path="/profile" render={() => <Dashboard />} />
          <Route exact path="/profile/edituser" render={() => <EditUser />} />
          <Route
            exact
            path="/profile/master/addcourse"
            render={() => <AddCourse />}
          />
          <Route
            exact
            path="/courses/:id/"
            render={(match) => <CoursePage match={match.match} />}
          />
          <Route
            exact
            path="/courses/:id/basket/:method"
            render={(match) => <Basket match={match.match} />}
          />
        </Switch>
      </Router>
    </>
  );
}
