import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Users from "./components/users/Users.js";
import User from "./components/users/User.js";
import Navbar from "./components/layout/Navbar.js";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios({
      baseURL: `https://api.github.com/search/users?q=${text}`,
      auth: {
        username: "b7b2bb9800cef2b3901f",
        password: "f8444ab8558415e0af59d9e449690eef492781b2",
      },
    });

    this.setState({ users: res.data.items, loading: false });
  };

  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios({
      baseURL: `https://api.github.com/users/${username}`,
      auth: {
        username: "b7b2bb9800cef2b3901f",
        password: "f8444ab8558415e0af59d9e449690eef492781b2",
      },
    });

    this.setState({ user: res.data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios({
      baseURL: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
      auth: {
        username: "b7b2bb9800cef2b3901f",
        password: "f8444ab8558415e0af59d9e449690eef492781b2",
      },
    });

    this.setState({ repos: res.data, loading: false });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, user, repos, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
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
  }
}

export default App;
