import { Component } from "react";

class App extends Component {
  constructor(props){
    super(props);
    this.state = { apiResponse: ""};
  }

  callAPI() {
    fetch("http://localhost:3000/testAPI")
      .then(res => res.text())
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
