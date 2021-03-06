import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Contacts from "./Components/Contacts/Contacts";
import Leads from "./Components/Leads/Leads";
import Service from "./Components/Services/Service";
import AllowAccess from './Components/Access/AllowAccess';
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";

const App = ({currentUser}) => {

  // useEffect(() =>{
  //   console.log(currentUser);
  // });

  return (
    <div>
      <Switch>
        <Route exact path="/signin">
          { currentUser === null?  <SignIn />  : <Redirect to="/dashboard" /> } 
        </Route>
        <Route exact path="/signup">
        { currentUser === null?  <SignUp />  : <Redirect to="/dashboard" /> } 
        </Route>
        <Route path="/dashboard">
          { currentUser !== null? <Navbar Component={Dashboard} />  : <Redirect to="/signin" /> }
        </Route>
        <Route path="/contacts">
          { currentUser !== null? <Navbar Component={Contacts} />  : <Redirect to="/signin" /> } 
        </Route>
        <Route path="/service">
          { currentUser !== null? <Navbar Component={Service} />  : <Redirect to="/signin" /> } 
        </Route>
        <Route path="/Leads">
          { currentUser !== null? <Navbar Component={Leads} />  : <Redirect to="/signin" /> } 
        </Route>
        <Route path="/access">
          { currentUser !== null? <Navbar Component={AllowAccess} />  : <Redirect to="/signin" /> } 
        </Route>
        <Redirect from="/" to="/signin" />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(App);