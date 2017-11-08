import React, { Component } from 'react';
import { subscribeToMessages, subscribeSendMessage, subscribeToOnlineUsers, newUser } from './api';
import './App.css';
import $ from 'jquery';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'Timestamp',
      messages: [],
      current_message: '',
      user_name: '',
      onlineUsers: [],

    };
    subscribeToMessages((err, messages) => this.setState({
      messages
    }));

    subscribeToOnlineUsers((err, onlineUsers) => this.setState({
      onlineUsers
    }));

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      current_message: event.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    subscribeSendMessage(this.state.user_name +':  ' + this.state.current_message)
    $('#messagesList').animate({
    scrollTop: $('#messagesList').get(0).scrollHeight
}, 1500);
    $('#msgInput').val('')
  }


  render() {
    const messageList = this.state.messages.map((message) =>
      <p key={message.toString()}><span><img className="avatar" src={`https://robohash.org/${message.split(':')[0]}`}/></span> {message}</p>
    );
    if(this.state.user_name == '') {
      let nickname = window.prompt("What is your name","Anonymous")
      newUser(nickname)
      this.setState({
        user_name: nickname
      })
    }

    const userList = this.state.onlineUsers.map((users) =>
      <li key={users}>{users}</li>
    );
    return (
      <div>
        <h1 id="siteTitle">RoboChat</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <ul id='messagesList'>{messageList}</ul>
            </div>
            <div className="col-lg-4 onlineUsers">
              <p>Online Users:</p>
              <ul id='userList'>{userList}</ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input type="text" className="form-control"  id='msgInput' name='message' placeholder="Write nice things"  onChange={this.handleChange}/>
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <i className="fa fa-envelope"></i>
                  </button>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>


      </div>
    );
  }
}





class App extends Component {
  render() {
    return (
      <div>
          <Chat />
      </div>
    );
  }
}

export default App;
