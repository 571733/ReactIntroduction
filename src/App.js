import React, { Component } from 'react';

import './App.css';

class App extends Component{
  apiKey = '8b5a4eb740281df88dda6f9512222ae4';
  apiUrl = 'https://api.themoviedb.org/3/search/movie?';
  imageUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';

  state = {
    query: "",
    content: []
  }
  onGo = async() => {
    const query = `${this.apiUrl}api_key=${this.apiKey}&query=${this.state.query}`;

    fetch(query)
        .then(res => res.json())
        .then(data => {
          this.setState({
            content: data.results
          })
        })
  };
  onChange = e => {
    this.setState({
      query: e.target.value
    })
  };

  onRender = (res) =>{
    return res.map(movie =>
    <div>
      <img src={this.imageUrl + movie.poster_path}/>
      <h3>{movie.title}</h3>
      <p>{movie.vote_average} / 10</p>
    </div>)
  };

  render(){
    return(
        <div className="App">
          <input type="text"
                 placeholder="Search"
                 value={this.state.query}
                 onChange={this.onChange}
          />
          <button onClick={this.onGo}> GO </button>
          <div className="grid">{this.state.content.length > 0 && this.onRender(this.state.content)}</div>
        </div>
    )
  }
}
export default App;

