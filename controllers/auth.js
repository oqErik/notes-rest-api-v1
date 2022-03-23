const { response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' )

const Usuario = require( '../models/user' );

const { generarJWT } = require( '../helpers/jwt' );


const login = async ( req, res = response ) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne( { correo } );
        if ( !usuario ) {
            return res.status( 400 ).json( {
                msg: 'User not found'
            } );
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status( 400 ).json( {
                msg: 'Incorrect User/Pass'
            } );
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json( {
            usuario,
            token
        } )

    } catch ( error ) {
        console.log( error )
        res.status( 500 ).json( {
            msg: 'Speak to an admin, something went wrong'
        } );
    }

}



module.exports = {
    login
}
