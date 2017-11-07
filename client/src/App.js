import React, { Component } from 'react';
import { subscribeToMessages, subscribeSendMessage } from './api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'Timestamp',
      messages: [],
      current_message: '',
      user_name: ''

    };
    subscribeToMessages((err, messages) => this.setState({
      messages
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
    console.log(this.state.current_message)
    subscribeSendMessage(this.state.user_name +':  ' + this.state.current_message)
  }


  render() {
    const messageList = this.state.messages.map((message) =>
      <li key={message.toString()}>{message}</li>
    );
    if(this.state.user_name == '') {
      let nickname = window.prompt("What is your name","Anonymous")
      this.setState({
        user_name: nickname
      })
    }
    return (
      <div>
        <p>username: {this.state.user_name}</p>
        <ul id='messagesList'>{messageList}</ul>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='message' onChange={this.handleChange}/>
          <input type='submit' value='send' />
        </form>
      </div>
    );
  }
}

export default App;
