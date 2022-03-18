const express = require( 'express' );
const cors = require( 'cors' );
const morgan = require( 'morgan' );

const { dbConnection } = require( '../database/config' );

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.usuariosPath = '/api/usuarios';
		this.authPath = '/api/auth';
		this.notesPath = '/api/notes';

		// Conectar a base de datos
		this.conectarDB();

		// Middlewares
		this.middlewares();

		// Rutas de mi aplicación
		this.routes();
	}

	async conectarDB() {
		await dbConnection();
	}

	middlewares() {
		// Morgan
		this.app.use( morgan( 'dev' ) );

		// CORS
		this.app.use( cors() );

		// Lectura y parseo del body
		this.app.use( express.json() );

		// Directorio Público
		this.app.use( express.static( 'public' ) );
	}

	routes() {
		this.app.use( this.authPath, require( '../routes/auth' ) );
		this.app.use( this.usuariosPath, require( '../routes/usuarios' ) );
		this.app.use( this.notesPath, require( '../routes/notes' ) );
	}

	listen() {
		this.app.listen( this.port, () => {
			console.log( 'Servidor corriendo en puerto', this.port );
		} );
	}
}
module.exports = Server;
