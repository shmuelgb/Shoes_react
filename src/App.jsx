import React, { Component } from "react";
import "./App.css";
import api from "./api";
import Shoes from "./Components/Shoes";

export default class App extends Component {
  state = { shoes: null, newShoe: "" };
  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    try {
      const { data } = await api.get("/shoes");
      this.setState({ shoes: data });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  newShowInput = (e) => {
    this.setState({ newShoe: e.target.value });
  };

  handleCreate = async () => {
    try {
      const newShoe = await api.post("/shoes", {
        name: this.state.newShoe,
      });
      this.setState({ shoes: [...this.state.shoes, newShoe.data] });
    } catch (err) {
      console.log(err);
    }
  };

  handleDelete = async (id) => {
    try {
      const deleted = await api.delete(`/shoes/${id}`);
      console.log("delete", deleted);
      const updatedShoes = this.state.shoes.filter((shoe) => shoe.id !== id);
      this.setState({ shoes: updatedShoes });
    } catch (err) {
      console.log(err);
    }
  };
  handleUpdate = async (id, value) => {
    try {
      const update = await api.put(`/shoes/${id}`, { name: value });
      console.log("update", update);
      const shoes = this.state.shoes;
      const index = this.findIndex(shoes, id);
      const item = this.state.shoes[index];
      item.name = value;
      shoes.splice(index, 1, item);
      this.setState({ shoes });
    } catch (err) {
      console.log(err);
    }
  };

  findIndex = (shoes, id) => {
    let index;
    shoes.forEach((shoe, i) => {
      if (shoe.id === id) index = i;
    });
    return index;
  };

  render() {
    return (
      <div>
        <div className="add">
          Add shoe:
          <input
            type="text"
            value={this.state.newShoe}
            onChange={this.newShowInput}
          />
          <button onClick={this.handleCreate}>Add</button>
          {this.state.shoes && (
            <Shoes
              updateFn={this.handleUpdate}
              deleteFn={this.handleDelete}
              shoes={this.state.shoes}
            />
          )}
        </div>
      </div>
    );
  }
}
