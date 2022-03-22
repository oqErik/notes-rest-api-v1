const { response } = require( 'express' )
const Usuario = require( '../models/user' );


const validarUser = async ( req, res = response, next ) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findOne( { _id: id } );
        // Verificar que exista el usuario
        if ( !usuario ) return res.status( 401 ).json( { msg: 'User not found' } );
        // Verificar si el usuario es el mismo
        const { _id: userRequested } = usuario;
        const { _id: askedUser } = req.user;
        // FIX THIS SOMEHOW THEY ARE DIFFERENT BEING BOTH OBJECTIDS
        console.log( userRequested );
        console.log( { askedUser } );
        if ( userRequested != askedUser ) return res.status( 403 ).json( { msg: 'forbidden' } );

        next();
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }

}


module.exports = {
    validarUser
}