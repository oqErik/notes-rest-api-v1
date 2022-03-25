const { response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );


const Usuario = require( '../models/user' );
const { generarJWT } = require( '../helpers/jwt' );
const { checkAdmin } = require( '../helpers/db-validators' );

// CREATE A NEW USER
// ONLY ADMINS CAN CREATE OTHER ADMINS
const usuariosPost = async ( req, res = response ) => {
    try {
        const { nombre, correo, password } = req.body;
        let { role = 'USER_ROLE' } = req.body;

        // Checar si admin
        const isAdmin = await checkAdmin( req.header( 'token' ) )
        if ( !isAdmin ) role = 'USER_ROLE';
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
// ONLY ADMINS CAN UPDATE OTHER USERS OR USERS THEMSELVS
const usuariosPut = async ( req, res = response ) => {
    try {
        const { id: idUsertoUpdate } = req.params;
        const { password, correo, ...resto } = req.body;
        // ECRYPT PASS
        if ( password ) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt );
        }
        // IF ADMIN OR USER THEMSELF
        if ( String( req.user.role ) === 'ADMIN_ROLE' || String( req.user._id ) === String( idUsertoUpdate ) ) {
            const usertoUpdate = await Usuario.findByIdAndUpdate( idUsertoUpdate, resto );
            if ( !usertoUpdate ) return res.status( 401 ).json( { msg: 'user not found' } );
            return res.status( 200 ).json( { msg: `User: ${usertoUpdate.nombre} updated succesfully!` } );
        }

        res.status( 401 ).json( { msg: 'bad request' } );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}

// DELETE A USER
// ONLY ADMINS CAN DELETE OTHER USERS OR USERS THEMSELVS
const usuariosDelete = async ( req, res = response ) => {
    try {
        const { id: idUsertoDelete } = req.params;
        // IF ADMIN OR USER THEMSELF
        if ( String( req.user.role ) === 'ADMIN_ROLE' || String( req.user._id ) === String( idUsertoDelete ) ) {
            const userDelete = await Usuario.findByIdAndDelete( idUsertoDelete );
            if ( !userDelete ) return res.status( 401 ).json( { msg: 'user not found' } );
            return res.status( 200 ).json( { msg: `User: ${userDelete.nombre} deleted succesfully!` } );
        }

        res.status( 401 ).json( { msg: 'bad request' } );
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