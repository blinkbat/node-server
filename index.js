


// require file system core node module
const fs = require( 'fs' );
// require http core module
const http = require( 'http' );
// require core url module
const url = require( 'url' );

// pass absolute path to fs & char set
const json = fs.readFileSync( `${__dirname}/data/data.json`, 'utf-8' );

// parse into json
const laptopData = JSON.parse( json );

// create server
const server = http.createServer( (request, response) => {

	console.log( 'server accessed. :O' );

	// parse url, turn into obj
	const pathName = url.parse( request.url, true ).pathname;
	console.log( pathName );

	// routing switch
	switch( pathName ) {

		case '/products':
			// send headers, ie 200 OK
			response.writeHead( 200, { 'Content-type': 'text/html' } );
			// send response
			response.end( 'this is the products page. buy shit' ); 
			break;

		case '/laptops':
			// send headers, ie 200 OK
			response.writeHead( 200, { 'Content-type': 'text/html' } );
			// send response
			response.end( 'yeah we got nightmare squares. cart it' ); 
			break;

		default:
			break;
	}

} );

// placeholder port - lol @ 1337, 127.0.0.1 = localhost IP
server.listen( 1337, '127.0.0.1', () => {

	console.log( 'we be listenin for requests' );

} );