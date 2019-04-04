import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import MovieRow from "./MovieRow.js";
// import MovieVideo from "./Components/MovieVideo.js";

import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.performSearch("woman");
  }

  performSearch(searchTerm) {
    // console.log("perform search");
    const API_KEY = "625914798003ef54176364f32c232968";
    const urlString = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`;
    const urlVideoString = `https://api.themoviedb.org/3/movie/297762/videos?api_key=${API_KEY}&language=en-US`;

    //fetch generic info
    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("fetch basic success");
        // console.log(searchResults);
        const results = searchResults.results;
        // console.log(results[0]);
        var movieRows = [];
        // call next ajax function
        $.ajax({
          url: urlVideoString,
          success: searchResults => {
            console.log("fetch video success");
            // console.log(searchResults);
            const results = searchResults.results;
            // console.log(results[0]);
            var videoRows = [];

            results.forEach(movie => {
              movie.video_src = movie.key;
              console.log(movie.video_src);

              var videoRow = <MovieRow key={movie.id} movie2={movie} />;
              videoRows.push(videoRow);
            });
            console.log("videoRows");
            console.log(videoRows);
            // this.setState({ rows: videoRows });

            // console.log("video state");
            // console.log(this.state);
          },

          error: (xhr, status, err) => {
            console.log("failed video fetch");
          }
        });
        results.forEach(movie => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          console.log(movie.poster_path);

          const movieRow = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(movieRow);
        });

        this.setState({ rows: movieRows });
        // console.log("basic state");
        // console.log(this.state);
      },

      error: (xhr, status, err) => {
        console.log("failed fetch");
      }
    });
  }
  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }
  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="100" src="green_app_icon.svg" />
              </td>
              <td width="8" />
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>
        <input
          style={{
            fontSize: 24,
            display: "block",
            width: "99%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16
          }}
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="Search for movie by title..."
        />
        {this.state.rows}
      </div>
    );
  }
}

export default App;
