const { response } = require( 'express' )


const esAdminRole = ( req, res = response, next ) => {
    try {
        const { role, nombre } = req.user;

        if ( role !== 'ADMIN_ROLE' ) {
            return res.status( 401 ).json( {
                msg: `${nombre} no es administrador - No puede hacer esto`
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