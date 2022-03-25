const Usuario = require( '../models/user' );
const jwt = require( 'jsonwebtoken' );

const emailExiste = async ( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne( { correo } );
    if ( existeEmail ) {
        throw new Error( `Mail: ${correo}, already exists` );
    }
}

const checkAdmin = async ( token ) => {
    if ( !token ) return false;
    try {
        const { _id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await Usuario.findById( _id );
        if ( !user ) return false;
        if ( user.role !== 'ADMIN_ROLE' ) return false;
        return true;
    } catch ( error ) {
        console.warn( error );
    }

}

module.exports = {
    emailExiste,
    checkAdmin
}

