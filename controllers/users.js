const { response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const Usuario = require( '../models/user' );
const { generarJWT } = require( '../helpers/jwt' );

// CREATE A NEW USER
const usuariosPost = async ( req, res = response ) => {
    try {
        const { nombre, correo, password, role } = req.body;
        const user = new Usuario( { nombre, correo, password, role } );

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );

        // Guardar en BD
        await user.save();

        // Generar jwt
        const token = await generarJWT( user._id )
        res.status( 201 ).json( {
            msg: `User: ${user.nombre} created succesfully!`,
            token: token
        } );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }

}

// UPDATE A USER, ONLY SENT FIELDS WILL BE UPDATED. MAIL CANNOT BE UPDATED
const usuariosPut = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        const { _id, password, correo, ...resto } = req.body;
        if ( password ) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt );
        }
        const usuario = await Usuario.findByIdAndUpdate( id, resto );

        res.status( 200 ).json( usuario );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}

// DELETE A USER
const usuariosDelete = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        await Usuario.findByIdAndDelete( id );

        res.status( 200 ).json( { msg: `User succesfully deleted` } );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}


module.exports = {
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}