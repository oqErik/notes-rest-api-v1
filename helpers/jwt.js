const jwt = require( 'jsonwebtoken' );

// Generates a jwt from the id given
const generarJWT = ( _id = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { _id };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log( err );
                reject( 'Cannot generate token' )
            } else {
                resolve( token );
            }
        } )

    } )
}


module.exports = {
    generarJWT
}

