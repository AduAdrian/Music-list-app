import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {TextField, Button} from '@material-ui/core';
import axios from 'axios';

const API_URL = 'https://ws.audioscrobbler.com/2.0/?limit=5&format=json&method=artist.search&api_key=' + process.env.REACT_APP_LASTFM_APPKEY;

// const isEmplt = (str) => str.length === 0;
class App extends Component {
state = {
searchTerm: '',
artists: []

}
onTextChange = (event) => {
const value = event.target.value;

this.setState({searchTerm: value});
}

search = (terms) => {
const request = API_URL + '&artist=' + terms;

console.log(request);

axios.get(request).then((response) => {
this.setState({ artists: response.data.results.artistmatches.artist });
})
}

onSearchClick = () => {
this.search(this.state.searchTerm);
}
//https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=d000cff27039229f64111c30e925a415&format=json


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
placeholder="Search on Spotify" 
onChange={this.onTextChange}
value={this.state.searchTerm}
/>
<Button 
onClick={this.onSearchClick} 
disabled={this.state.searchTerm.length === 0}
>Search
</Button>
</Toolbar>
</AppBar>
</header>
<ul>
{this.state.artists.map((artist, i ) => {
return <li key ={i}><span >artist name :{artist.name}   Views: {artist.listeners} </span></li>


})}
</ul>

</div>
);
}
}

export default App;