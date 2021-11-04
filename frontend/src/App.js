import React, { Component } from 'react';
import './App.css';
/* import axios from 'axios';
 * import { Button, Container, Card, Row } from 'react-bootstrap' */


class App extends Component {
  constructor(props){
    super(props);
    this.state = { apiResponse: ""};
  }

  callAPI() {
    fetch("http://localhost:5000/testAPI")
      .then(res => res.text().title)
      .then(res => this.setState({apiResponse: res}))
      .catch(err=> err);

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

/* 
 * const Koa = require('koa')
 * const app = new Koa()
 * 
 * app.use(async (ctx, next) => {
 *   ctx.body = 'Hello World From the Backend Container'
 * })
 * 
 * const port = process.env.PORT || 3000
 * 
 * app.listen(port, err => {
 *   if (err) console.error(err)
 *   console.log(`App Listening on Port ${port}`)
 * }) */
