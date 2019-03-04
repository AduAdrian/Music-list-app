import React, { Component } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Card,
  CardContent
} from "@material-ui/core";
import axios from "axios";

const API_URL =
  "https://ws.audioscrobbler.com/2.0/?limit=5&format=json&method=artist.search&api_key=" +
  process.env.REACT_APP_LASTFM_APPKEY;

const isEmpty = str => str.length === 0;
class App extends Component {
  state = {
    searchTerm: "",
    artists: [],
    saveArtists: []
  };

  componentDidMount  () {
    const saveArtists = localStorage.getItem('savedArtists')
    if(saveArtists){
        this.setState({saveArtists: JSON.parse(saveArtists)})
    }
  }
  onTextChange = event => {
    const value = event.target.value;

    this.setState({ searchTerm: value });
  };

  search = terms => {
    const request = API_URL + "&artist=" + terms;

    console.log(request);

    axios.get(request).then(response => {
      const results = response.data.results;
      const artists = results.artistmatches.artist.map(artist => {
        const avatarImage = artist.image.find(image => image.size === "medium");
        const imageUrl = avatarImage["#text"];
        return { ...artist, avatar: imageUrl };
      });

      this.setState({ artists });
    });
  };

  onSearchClick = () => {
    this.search(this.state.searchTerm);
  };
  clearSearch = () => {
    this.setState({
      searchTerm: "",
      artist: []
    });
  };
  onResultClick = artist => {
    this.clearSearch();
    const saveArtists = this.state.saveArtists;
    saveArtists.push(artist)
    this.setState({ saveArtists :saveArtists})
    localStorage.setItem('savedArtists', JSON .stringify(saveArtists))
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Last Fm search
              </Typography>
              <TextField
                placeholder="Search on LastFm"
                onChange={this.onTextChange}
                value={this.state.searchTerm}
              />
              <Button
                onClick={this.onSearchClick}
                disabled={this.state.searchTerm.length === 0}
                variant="contained"
              >
                Search
              </Button>
              {!isEmpty(this.state.searchTerm) && (
                <Button
                  onClick={clearSearch => {
                    this.setState({ searchTerm: "" });
                  }}
                  variant="contained"
                >
                  Clear Search
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </header>
        <List>
          {this.state.artists.map((artist, i) => {
            return (
              <ListItem
                button
                key={i}
                onClick={() => this.onResultClick(artist)}
              >
                <ListItemAvatar>
                  <Avatar src={artist.avatar} alt={artist.name} />
                </ListItemAvatar>
                <ListItemText primary={artist.name} />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className="add-button"
                >
                  Add to favorite
                </Button>
              </ListItem>
            );
          })}
        </List>
        <div className="artist-container">
          {this.state.saveArtists.map(artist => {
            return (
              <Card>
                <CardContent>
                {artist.name}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
//Homework
// Afisare user " song not found" in caz de nu gaseste nici un rezultat

