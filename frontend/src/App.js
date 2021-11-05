import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import SearchBox from "./components/SearchBox.js";
const axios = require("axios");

/* import { Button, Container, Card, Row } from 'react-bootstrap' */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "", searchTerm: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callAPI() {
    fetch("http://localhost:5000/testAPI")
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res.title }))
      .catch((err) => err);
  }

  componentDidMount() {
    console.log("mount");
    this.callAPI();
  }

  componentWillUnmount() {
    console.log("unmount");
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }
  handleSubmit = (e, data) => {
    const url = "http://localhost:5000/author/" + this.state.searchTerm;
    console.log(url);
    axios
      .get(url)
      .then((res) => this.setState({ searchTerm: res.data.title }))
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        console.log("done");
      });

    e.preventDefault();
  };

  render() {
    return (
      <div>
        <SearchBox
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          placeholder="enter tweet"
        />
        <p>
          hi {this.state.apiResponse} and {this.state.searchTerm}
        </p>
      </div>
    );
  }
}
export default App;
