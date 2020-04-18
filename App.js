import React, { Component } from "react";
import "./styles.css";
import Display from "./Display.js";
class App extends Component {
  constructor() {
    super();
    this.state = {
      Posts: [],
      userSearch: "",
      clicked: false
    };
  }
  render() {
    return (
      <div className="App">
        <h1>C O R S E A R C H</h1>
        <input id="courseSearch" type="text" />
        <button id="searchBtn" onClick={this.submitResponse.bind(this)}>
          Search Courses
        </button>
        <hr />
        <ul>
          <p>{this.noMatches()}</p>
          {this.state.Posts.map(course => {
            if (course.title && course.level && course.imgUrl) {
              return (
                <Display
                  name={course.title}
                  level={course.level}
                  src={course.imgUrl}
                />
              );
            } else {
              return <area alt="not found" />;
            }
          })}
        </ul>
      </div>
    );
  }

  noMatches() {
    //alert(submitButton.value);
    if (
      this.state.Posts.length === 0 &&
      (this.state.userSearch === "" && this.state.clicked)
    ) {
      return "PLEASE ENTER A SEARCH";
    } else if (
      this.state.Posts.length === 0 &&
      this.state.userSearch !== "" &&
      this.state.clicked
    ) {
      return "SEARCH NOT FOUND";
    }
  }
  submitResponse() {
    let submitButton = document.getElementById("courseSearch");
    //alert(submitButton.value);
    this.setState({ Posts: [] });
    this.setState({ userSearch: submitButton.value });
    this.setState({ clicked: true });
    //alert(this.state.userSearch);
    this.renderPosts();
  }

  testing() {
    let data = this.state.Posts;
    if (data.length > 0) {
      console.log(data[0]["title"]);
      data.sort((a, b) => {
        return a.providerRatings - b.providerRatings;
      });
      data.reverse();
      console.log(data[0]["title"]);
    }
  }
  renderPosts = async () => {
    //alert("in here!");
    try {
      let link =
        "https://cors-anywhere.herokuapp.com/https://quze-intern-test.s3.us-east-2.amazonaws.com/course-data.json";
      let result = await fetch(link);
      let data = await result.json();
      // this will re render the view with new data
      let filtered = [];
      if (this.state.userSearch !== "") {
        for (let i = 0; i < data.length; i++) {
          if (
            data[i]["title"]
              .toLowerCase()
              .trim()
              .indexOf(this.state.userSearch.toLowerCase().trim()) !== -1 ||
            data[i]["tags"]
              .toLowerCase()
              .trim()
              .indexOf(this.state.userSearch.toLowerCase().trim()) !== -1
          ) {
            filtered.push(data[i]);
          }
        }
      }
      this.setState({
        Posts: filtered
      });
    } catch (err) {
      console.log(err);
    }
    this.testing();
  };

  greeting(name) {
    return "Hello, " + name;
  }
}

export default App;
