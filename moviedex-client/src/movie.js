import React from 'react';

//imprime informacion sobre la pelicula
function movie( props ){
    return(
        <div>
            {props.title}
            {props.year}
            {props.rating}
        </div>
    )
}

export default movie;