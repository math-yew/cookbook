import React from 'react';

import Number from './number.js';

class Math extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      num1: 1,
      num2: 2,
      name: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.cb = this.cb.bind(this);
  }

  handleChange(e) {
    let name = "num1";
    this.setState({name:e.target.value})
  }

  cb(d){
    this.setState(d);
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

 render() {
   console.log("math state: " + JSON.stringify(this.state));
   return (
     <div>
       <p>Name: {this.state.name}</p>
       <input type="text" onChange={this.handleChange} />

       <p>{this.state.num1} + {this.state.num2} = {this.state.num1*1 + this.state.num2*1}</p>
       <p>Number 1: <Number action={this.cb} i="num1" num={this.state.num1} /></p>
       <p>Number 2: <Number action={this.cb} i="num2" num={this.state.num2} /></p>
     </div>
   )
 }

}

export default Math;
