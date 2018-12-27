


// require file system core node module
const fs = require( 'fs' );
// require http core module
const http = require( 'http' );
// require core url module
const url = require( 'url' );

// pass absolute path & char set to fs.
// synchronous function because this is loaded at app start
const json = fs.readFileSync( `${__dirname}/data/data.json`, 'utf-8' );
// parse into json
const laptopData = JSON.parse( json );



/**************************************************/
// SERVER START

// async functions in here so as to not block main thread
const server = http.createServer( (request, response) => {

	console.log( 'server accessed. :O' );

	// parse pathname
	const pathName 	= url.parse( request.url, true ).pathname;
	// parse query str 'id' 
	const prodId 	= url.parse( request.url, true ).query.id; 

	// redirect index
	if( pathName === '' ) { pathName = '/products'; }



	/**************************************************/
	// ROUTING START

	// PRODUCTS PAGE
	if( pathName === '/products' || pathName === '/' ) {
		// send headers, ie 200 OK
		response.writeHead( 200, { 'Content-type': 'text/html' } );
		// send response -- overview temp
		fs.readFile( `${__dirname}/templates/template-overview.html`, 'utf-8', ( err, data ) => {

			let overviewOutput = data;

			// read card template inside
			fs.readFile( `${__dirname}/templates/template-card.html`, 'utf-8', ( err, data ) => {

				// map data per item, then concat str for output
				const cardsOutput = laptopData.map( el => replaceTemplate( data, el ) ).join( '' );
				
				// replace placeholder with output & send
				overviewOutput = overviewOutput.replace( '{%CARDS%}', cardsOutput );
				response.end( overviewOutput );

			} );

		} );

	// LAPTOP DETAIL
	} else if( pathName === '/laptop' && prodId < laptopData.length ) {
		// laptop pg
		response.writeHead( 200, { 'Content-type': 'text/html' } );
		
		// show appropriate nightmare square. handle err or data
		fs.readFile( `${__dirname}/templates/template-laptop.html`, 'utf-8', ( err, data ) => {

			// pull current product's data
			const laptop = laptopData[ prodId ];
			const output = replaceTemplate( data, laptop );
			response.end( output );

		} );

	// IMAGE ROUTING
	// test if regex is contained in path
	} else if( ( /\.(jpg|jpeg|png|gif)$/i ).test( pathName ) ) {

		fs.readFile( `${__dirname}/data/img/${pathName}`, ( err, data ) => {

			response.writeHead( 200, { 'Content-type': 'image/jpg' } );
			response.end( data );

		} );

	// 404 NOT FOUND
	} else {
		response.writeHead( 404, { 'Content-type': 'text/html' } );
		response.end( 'specify a URL, dummy' ); 
	}

	/**************************************************/
	// END ROUTING



/**************************************************/
// END SERVER
} );

// placeholder port - lol @ 1337, 127.0.0.1 = localhost IP
server.listen( 1337, '127.0.0.1', () => {

	console.log( 'we be listenin for requests' );

} );



// function to replace placeholders with data
function replaceTemplate( originalHtml, laptop ) {

	// start replacing temp strings. first str is read from data...
	let output = originalHtml.replace( /{%PRODUCTNAME%}/g, laptop.productName );

	// & rest are read from output, to create a new obj.
	output = output.replace( /{%IMAGE%}/g, laptop.image );
	output = output.replace( /{%PRICE%}/g, laptop.price );
	output = output.replace( /{%SCREEN%}/g, laptop.screen );
	output = output.replace( /{%CPU%}/g, laptop.cpu );
	output = output.replace( /{%STORAGE%}/g, laptop.storage );
	output = output.replace( /{%RAM%}/g, laptop.ram );
	output = output.replace( /{%DESCRIPTION%}/g, laptop.description );
	output = output.replace( /{%ID%}/g, laptop.id );

	return output;

}







