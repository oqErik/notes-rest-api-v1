const Usuario = require( '../models/user' );


const emailExiste = async ( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne( { correo } );
    if ( existeEmail ) {
        throw new Error( `Mail: ${correo}, already exists` );
    }
}


module.exports = {
    emailExiste
}

