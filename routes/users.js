
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );


const { emailExiste } = require( '../helpers/db-validators' );

const {
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    getProfile } = require( '../controllers/users' );

const router = Router();

// CREATE A NEW USER
router.post( '/',
    [
        check( 'name', 'name must contain between 3 and 24 characters' ).isLength( { min: 3, max: 24 } ),
        check( 'password', 'password must contain between 3 and 24 characters' ).isLength( { min: 3, max: 24 } ),
        check( 'email', 'not a valid email' ).isEmail(),
        check( 'email' ).custom( emailExiste ),
        validarCampos
    ],
    usuariosPost );

// UPDATE A USER
router.put( '/:id',
    [
        validarJWT,
        check( 'name', 'name must contain between 3 and 24 characters' ).isLength( { min: 3, max: 24 } ),
        check( 'password', 'password must contain between 3 and 24 characters' ).isLength( { min: 3, max: 24 } ),
        check( 'id', 'not a valid ID' ).isMongoId(),
        validarCampos
    ],
    usuariosPut );

// DELETE A USER
router.delete( '/:id',
    [
        validarJWT,
        check( 'id', 'not a valid ID' ).isMongoId(),
        validarCampos
    ],
    usuariosDelete );

// GET PROFILE
router.get( '/',
    [
        validarJWT,
    ],
    getProfile );

module.exports = router;