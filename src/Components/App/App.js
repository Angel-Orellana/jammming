import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {name: 'Title1', artist: 'Artist1', album: 'Album1', id: 1}, 
        {name: 'Title2', artist: 'Artist2', album: 'Album2', id: 2}, 
        {name: 'Title3', artist: 'Artist3', album: 'Album3', id: 3}
      ], 
      playlistName: 'Playlist1', 
      playlistTracks: [
        {name: 'Title1', artist: 'Artist1', album: 'Album1', id: 1}, 
        {name: 'Title2', artist: 'Artist2', album: 'Album2', id: 2}, 
        {name: 'Title3', artist: 'Artist3', album: 'Album3', id: 3}
      ], 
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((selectedTrack) => track.id === selectedTrack.id)){
      return;
    } else {
        tracks.push(track);
    }
    this.setState({ playlistTracks: tracks });
  }

  render() {
    return (<div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName}/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
