import React, { Component } from "react";
import "./App.css";
import SearchBox from './components/SearchBox.js'
/* const axios = require('axios'); */

/* import { Button, Container, Card, Row } from 'react-bootstrap' */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "", searchTerm: "" };
  }

  callAPI() {
    fetch("http://localhost:5000/testAPI")
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res.title }))
      .catch((err) => err);
  }

  componentDidMount() {
    console.log("start")
    this.callAPI();
  }

  search(e) {
    console.log("bro")
  }
  
  render() {
    return (
      <div>
      <p> in react app</p>
      <SearchBox onSubmit={this.search} />

      <p>hi {this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
