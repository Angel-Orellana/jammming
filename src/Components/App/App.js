import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

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
        {name: 'Title4', artist: 'Artist4', album: 'Album4', id: 4}, 
        {name: 'Title5', artist: 'Artist5', album: 'Album6', id: 5}, 
        {name: 'Title6', artist: 'Artist6', album: 'Album6', id: 6}
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((selectedTrack) => track.id === selectedTrack.id)){
      return;
    } 
    
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let newTracks = tracks.filter((selectedTrack) => track.id !== selectedTrack.id);
    this.setState({ playlistTracks: newTracks});
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    let trackURIs= this.state.playlistTracks.map(track => track.uri);
    return trackURIs;
  }

  search(term) {
    Spotify.search(term).then(searchResults => 
      this.setState({
        searchResults: searchResults 
      }));    
  }

  render() {
    return (<div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          <Playlist playlistTracks={this.state.playlistTracks} 
                    playlistName={this.state.playlistName} 
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
