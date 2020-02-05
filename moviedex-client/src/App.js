import React from 'react';
import './App.css';
import NewMovie from 'newMovie.js';
let url = "http://localhost:8080";


class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      peliculas : [
      ],
      apiURL : url,
    }
  }

  //For adding movies to the list
  addMovie = (peli) => {
    let listaPelicula = [...this.state.pelicula, peli];
    
    this.setState({
      peliculas : listaPelicula
    });
  }

  //Aqui va el FETCH no se puede usar ajax -> JSX syntax 
  componentDidMount(){
    let url = `${this.state.apiURL}/api/moviedex`;
    let settings = {
      method : 'GET'
    }
    fetch( url, settings )
      .then( response => {
    if( response.ok ){
      return response.json();
    }
      throw new Error(response.statusText);
    })
    .then( responseJSON => {
      this.setState({
      //sending movies to peliculas
      peliculas : responseJSON
      })
    })
    .catch( err => {
      console.log(err);
    });
  }

  //Display
  render(){
    return (
      <div>
        <NewMovie addMovie={this.addMovie}/>
      </div>
      <div>
        {this.state.peliculas.map( ( title,year,rating ) => {
          return (<movie title={title} year={year} rating={rating} />)
        })}
      </div>   
    )
  }
}





export default App;
