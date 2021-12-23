import React, { Component } from "react";

class Input extends Component {
  state = { updatedName: "" };
  handleSubmit = () => {
    this.props.updateFn(this.props.id, this.state.updatedName);
  };
  handleOnChange = (e) => {
    this.setState({ updatedName: e.target.value });
  };
  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleOnChange}
          value={this.state.updatedName}
        />
        <button onClick={this.handleSubmit}>Update</button>
      </div>
    );
  }
}
export default Input;
