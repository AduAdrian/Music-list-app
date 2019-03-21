import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { getArtists } from './services/api';

import {
  TextField,
  Button,
  List
} from '@material-ui/core';

import { ArtistCard } from './components/ArtistCard';
import { SearchResult } from './components/SearchResult';

import './App.css';
import { get } from 'https';

const isEmpty = (str) => str.length === 0;
class App extends Component {


      state = {
      searchTerm: '',
      savedArtists: [],
      rate: ''
    }
  

  componentDidMount() {
    const existing = localStorage.getItem('savedArtists')
    const rate = localStorage.getItem('rate')
    if (existing || rate) {
      this.setState({ savedArtists: JSON.parse(existing) })
      this.setState({ rate: JSON.stringify(rate) })
    }
  }
  handleChangeRate = (state) => {
    this.setState({rate: state})
  }

  onTextChange = (event) => {
    const value = event.target.value;

    this.setState({ searchTerm: value });
  }

  search = async (terms) => {

    const artists = await getArtists(terms);
    this.setState({ artists: artists })
  }

  onSearchClick = () => {
    this.search(this.state.searchTerm);
  }

  clearSearch = () => {
    this.setState({
      searchTerm: '',
      artists: []
    })
  }
  updateRate = (newRate) => {
    this.setState({rate:newRate})
    localStorage.localStorage.setItem('rate',JSON.stringify(newRate))
  }
  updateArtists = (newArtists) => {
    this.setState({ savedArtists: newArtists })
    localStorage.setItem('savedArtists', JSON.stringify(newArtists));
  }

  deleteArtist = (artist) => {
    const result = this.state.savedArtists.filter(item => item.name !== artist.name);
    this.updateArtists(result);
  }
  onclickrating = (newRate) => {
    const rate = this.state.rate;
    this.rate =newRate
    this.updateRate(rate)
    console.log(rate);
  }

  onResultClick = (artist) => {
    this.clearSearch();
    const savedArtists = this.state.savedArtists;
    savedArtists.push(artist);
    this.updateArtists(savedArtists);
  }

  render() {
    const results = this.state.artists || [];
    return (
      <div className="App">
        <header className="App-header">
          <AppBar position="static" color="primary">
            <Toolbar className="search-bar">
              <Typography variant="h6" color="inherit">
                Photos
              </Typography>
              <TextField
                placeholder="Search on Last.fm"
                className="search-input"
                onChange={this.onTextChange}
                value={this.state.searchTerm}
              />
              <Button
                onClick={this.onSearchClick}
                variant="contained"
                color="secondary"
                disabled={isEmpty(this.state.searchTerm)}
              >
                Search
              </Button>
              {!isEmpty(this.state.searchTerm) && (
                <Button
                  onClick={this.clearSearch}
                  variant="contained"
                >
                  Clear
                </Button>)
              }
            </Toolbar>
          </AppBar>
        </header>

        <List className="search-results">
          {
            results.map((artist, index) => {
              return <SearchResult key={index} artist={artist} onResultClick={this.onResultClick} />
            })
          }
        </List>
        <div className="artist-container">
          {
            this.state.savedArtists.map((artist, index) => {
              return <ArtistCard artist={artist} key={index} rating={this.state.rate} deleteArtist={this.deleteArtist} onChangeRating={this.handleChangeRate}  />
            })
          }
        </div>
      </div>
    );
  }
}

export default App;




//Filter, ForEach , map, reduce !Important .

//psd reporduct site 
//display , visibility  dif between it ., arrow functions .
// display in-line , padding margin nu se aplica 
// display in line block se aplica box sizing 

//**CV 
//1.ce scriem ? 
//Orice lucru pus pe cv trebuie sa stii bine ce scrii , in caz de interviatorul stiie foarte bine aceea chestie , pui doar ce stii sa faci foarte bine ! 
//Oameni cu care dai interviu , au autoritate totala asupra deciziei !
//Ex  stuidii ' am terminat cursul de front end iasi bla bla '. Create react app "CRUD(Create read update  delete)**", last fm search for artists , rate etc .
//Tehnology used , react axios , material ui etc , localstorage
//Your skill , html css , javascript , location etc ,
//Your work , last fm app *must work **
//Pages.github.com** Postam aplicatia pe git ca si pagina web 
////// punem link in cv
//Punem accent pe toate chestiile de mai sus
//Keep it short  1-2 pages .
//Fara stilizare prin cv  typeos.
//Fara culori fancy , alb negru , foarte putina culoare 
//Metodology , scrum agile , waterfall
//pre intv, preselectie in functie de ce au nevoie .
//telefon + mail + adressa simpla "Suceava" +skype id ( microsoft account);
//Raman 50 pers ,care vor fi contactate
//Interviu telefonic ,  raspunsuri decente 
//Intrebari eliminatorii !**
//2 intv
//
//
//
//
