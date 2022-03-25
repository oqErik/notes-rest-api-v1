const { response } = require( 'express' )


const esAdminRole = ( req, res = response, next ) => {
    try {
        const { admin, name } = req.user;

        if ( admin !== true ) {
            return res.status( 401 ).json( {
                msg: `${name} not an admin, cannot do that`
            } );
        }

        next();
    } catch ( error ) {
        console.log( error );
    }

}

/* 
const tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
} */



module.exports = {
    esAdminRole

}