const { response, request } = require( 'express' );
const jwt = require( 'jsonwebtoken' );

const Usuario = require( '../models/user' );


const validarJWT = async ( req = request, res = response, next ) => {

    const token = req.header( 'token' );

    if ( !token ) {
        return res.status( 401 ).json( {
            msg: 'There is no token on the petition'
        } );
    }

    try {


        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al uid
        const user = await Usuario.findById( uid );

        if ( !user ) {
            return res.status( 401 ).json( {
                msg: 'Token no valid'
            } )
        }


        req.user = user;
        next();

    } catch ( error ) {
        // console.log( error );
        return res.status( 401 ).json( {
            msg: 'Token expired'
        } )



    }

}


module.exports = {
    validarJWT
}