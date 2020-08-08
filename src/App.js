import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Users from "./components/users/Users.js";
import User from "./components/users/User.js";
import Navbar from "./components/layout/Navbar.js";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios({
      baseURL: `https://api.github.com/search/users?q=${text}`,
      auth: {
        username: "b7b2bb9800cef2b3901f",
        password: "f8444ab8558415e0af59d9e449690eef492781b2",
      },
    });

    setUsers(res.data.items);
    setLoading(false);
  };

  const getUser = async (username) => {
    setLoading(true);

    const res = await axios({
      baseURL: `https://api.github.com/users/${username}`,
      auth: {
        username: "b7b2bb9800cef2b3901f",
        password: "f8444ab8558415e0af59d9e449690eef492781b2",
      },
    });

    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios({
      baseURL: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
      auth: {
        username: "b7b2bb9800cef2b3901f",
        password: "f8444ab8558415e0af59d9e449690eef492781b2",
      },
    });

    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {

  setUsers([]);
  setLoading(false);
  
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
