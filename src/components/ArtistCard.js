import React from 'react';
import { Card, CardContent, CardActions, Button } from '@material-ui/core'
import ReactStars from 'react-stars'

import { Star, StarBorder } from '@material-ui/icons'

export const ArtistCard = (props) => {

  const { artist, deleteArtist, onChangeRating } = props;

  return (
    <Card className="artist-card">
      <div className="image-container">
        <img src={artist.cardImage} alt={artist.name} />
      </div>
      <CardContent>
        <h3>{artist.name}</h3>
        <p>{artist.listeners} listeners.</p>
        <ReactStars
    value={props.rating}
    count = {5}
    onChange={(newRating) => onChangeRating(newRating)}
    size={27}
    color2 ={'#ffd700'}
    />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
      </Button>
        <Button size="small" color="secondary" onClick={() => deleteArtist(artist)}>
          Delete
      </Button>
      </CardActions>
    </Card>
  )
}


///*** */Browseru nu face mai mult de 3-4 requesturi simultan 

//Nginix npm i -g http-serve
//Seo***
//Site-ul  sa apara in motoare de cautare  folosind ad'urile la cautari cat mai simple , dar costa mai mult .

///Chaching
//LightHouse 4.2