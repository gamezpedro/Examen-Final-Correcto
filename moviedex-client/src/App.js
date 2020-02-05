import React from 'react';
import './App.css';
let url = "http://localhost:8080"

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      peliculas : [],
      apiURL : url,
    }
  }

  //FETCH no se puede usar ajax -> JSX syntax 
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
        
      </div>
    );
  }
}

export default App;
