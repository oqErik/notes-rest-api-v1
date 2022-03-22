const { response, request } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const Usuario = require( '../models/user' );

// GET ALL USERS
const usuariosGet = async ( req = request, res = response ) => {
    try {
        const query = { estado: true };

        const [ total, usuarios ] = await Promise.all( [
            Usuario.countDocuments( query ),
            Usuario.find( query )
        ] );

        res.status( 200 ).json( {
            total,
            usuarios
        } );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}

// CREATE A NEW USER
const usuariosPost = async ( req, res = response ) => {
    try {
        const { nombre, correo, password, role } = req.body;
        const usuario = new Usuario( { nombre, correo, password, role } );

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        // Guardar en BD
        await usuario.save();

        res.status( 200 ).json( {
            usuario
        } );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }

}

// UPDATE A USER
const usuariosPut = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        const { _id, password, google, correo, ...resto } = req.body;
        if ( password ) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt );
        }
        const usuario = await Usuario.findByIdAndUpdate( id, resto );

        res.satatus( 200 ).json( usuario );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}

// DELETE A USER
const usuariosDelete = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

        res.status( 200 ).json( usuario );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }




}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}