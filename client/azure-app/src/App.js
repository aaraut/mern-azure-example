import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/thoughts")
      .then(res => {
        this.setState({ thoughts: res.data });
      })
      .catch(alert);
  }
  render() {
    const { thoughts } = this.state;

    return (
      <div className="App">
        <button onClick={this.createThought}>Create Thought</button>
        <button onClick={this.deleteThoughts}>Delete Thought</button>
        <button onClick={this.seedThought}>Seed Thought</button>

        <ul>{thoughts.map(thoughtModel => <li key={thoughtModel.thought}>{thoughtModel.thought}</li>)}</ul>
      </div>
    );
  }

  createThought = () => {
    const thought = prompt("Enter your thoughts");

    if (!thought) return;
    axios
      .post("api/thoughts/create", { thought })
      .then(res => {
        this.setState({ thoughts: [...this.state.thoughts, res.data] });
      })
      .catch(err => alert(`Failed to create \n ${JSON.stringify(err)}`));
  };

  deleteThoughts = () => {
    const doDelete = window.confirm('Delete all Thoughts?');
    if (!doDelete) return;
    axios
      .delete('/api/thoughts/')
      .then(res => this.setState({ thoughts: [] }))
      .catch(err => alert(`Failed to delete all thoughts\n${JSON.stringify(err)}`));
  };


  seedThought = () => {
    const doSeed = window.confirm("Are you sure you want to seed");

    if (!doSeed) return;
    axios
      .post("api/thoughts/seed", {})
      .then(res => {
        axios
          .get("api/thoughts")
          .then(innerRes => {
            this.setState({ thoughts: innerRes.data });
          })
          .catch(alert);
      })
      .catch(alert);
  };
}
export default App;
