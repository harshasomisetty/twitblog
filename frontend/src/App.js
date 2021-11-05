import React, { Component } from "react";
import "./App.css";
/* import axios from 'axios';
 * import { Button, Container, Card, Row } from 'react-bootstrap' */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:5000/testAPI")
      .then((res) => res.text().title)
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <p> in react app</p>
        <p>hi {this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
