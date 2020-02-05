let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

/* Tu código va aquí */


pelicula = {
    film_ID: uuid,
    film_title: String,
    year: Number,
    rating: Number
}

let pelicula = mongoose.Schema('pelicula',MovieSchema);

let movies ={

    getAll : function(){
        return pelicula.find()
        .then( peli => {
            return peli;
        })
        .catch( error => {
            throw Error( error );
        });
    },

    addMovie :function(newMovie){
         return pelicula.create(newMovie)
         .then( peli => {
            return peli;
            })
        .catch( error => {
            throw Error( error );
        });
    }

};


module.exports = {
    movies
};