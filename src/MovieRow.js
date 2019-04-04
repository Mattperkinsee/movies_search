import React from "react";
// import YoutubeVideo from "./Components/YoutubeVideo";
import YouTube from "react-youtube";
// import { Player } from "video-react";

class MovieRow extends React.Component {
  constructor(props) {
    super(props);
    // console.log("try view movie");
    // console.log(this.props.movie.video_src);
    this.state = {};
  }
  viewMovie() {
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id;
    window.location.href = url;
  }
  viewTrailer() {
    console.log("view trailer");
    console.log("");
    //const trailerURL = "https://www.youtube.com/watch?v=1Q8fG0TtVAY";
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  render() {
    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <table key={this.props.movie.id}>
        <tbody>
          <tr>
            <td>
              <img alt="poster" width="180" src={this.props.movie.poster_src} />
            </td>
            <td>
              <h1>src {this.props.movie.video_src}</h1>
              <h3>{this.props.movie.title}</h3>
              <p>{this.props.movie.overview}</p>

              <YouTube
                videoId={this.props.movie.video_src}
                opts={opts}
                onReady={this._onReady}
              />
              <input
                className="btn btn-primary"
                type="button"
                onClick={this.viewTrailer.bind(this)}
                value="Play Trailer"
              />
              <input
                className="btn btn-primary"
                type="button"
                onClick={this.viewMovie.bind(this)}
                value="View"
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default MovieRow;
