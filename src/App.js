import React, { Component } from 'react';
import './App.css';
import Users from './components/users/Users.js'
import Navbar from './components/layout/Navbar.js';
import Search from './components/users/Search';
import axios from 'axios';


class App extends Component {

    state = {
        users: [],
        loading: false
    }

    searchUsers = async text => {
        this.setState({ loading: true });


        const res = await axios({
            baseURL: `https://api.github.com/search/users?q=${text}`,
            auth: { username: 'b7b2bb9800cef2b3901f', password: 'f8444ab8558415e0af59d9e449690eef492781b2'} 
      })
      
      
      this.setState({ users: res.data.items, loading: false })

    };

    clearUsers = () => this.setState({ users:[], loading: false });

    render() {

        const {users, loading} = this.state;


        return (
            <div className="App">
                <Navbar />
                <div className="container">
                    <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={ users.length > 0 ? true:false }/>
                    <Users loading={loading} users={users}/>
                </div>
            </div>
        );
    }
}

export default App;
