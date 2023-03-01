import React from "react";

class Number extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      num: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let obj = {};
    obj[this.props.i] = e.target.value;
    this.setState(obj);
    return this.props.action(obj);
  }

  render() {
    console.log("num state: " + JSON.stringify(this.state));
    return(
      <div>
        <input type="text" onChange={this.handleChange} placeholder={this.props.num}/>
      </div>
    )
  }

}

export default Number;
