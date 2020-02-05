let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let movies = require('./model');


let app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

/* Tu código va aquí */

app.get( '/api/moviedex', jsonParser, ( req, res ) => {
    console.log( req.body);
    movies.getAll()
        .then( movies => {
            return res.status( 200 ).json( movies );
        })
        .catch( error => {
            console.log(error);
            res.statusMessage = "Hubo un error de conexion con la BD."
            return res.status( 500 ).send();
        });
});

app.post('/api/moviedex', jsonParser, (req, res)=>{
    
	//let id = req.body.film_ID;
	let title = req.body.film_title;
	let year = req.body.year;
	let rating = req.body.rating;

	let peli ={
		title,
		year,
		rating
	}

	if(!title||!year||!rating){
		res.statusMessage = "Falta algun parámetro de pelicula";
		return res.status( 406 ).send();
	}
	else{	
		movies.addMovie(peli)
		.then( movie => {
            return res.status( 201 ).json( movie );
        })
        .catch( error => {
            console.log(error);
            res.statusMessage = "Hubo un error de conexion con la BD.";
            return res.status( 500 ).send();
        });
	}
});


let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}