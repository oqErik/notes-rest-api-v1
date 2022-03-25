
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT } = require( '../middlewares' );


const { emailExiste } = require( '../helpers/db-validators' );

const {
    usuariosPut,
    usuariosPost,
    usuariosDelete } = require( '../controllers/users' );

const router = Router();

// CREATE A NEW USER
router.post( '/',
    [
        check( 'name', 'name is empty' ).not().isEmpty(),
        check( 'password', 'password must contain at least 3 characters' ).isLength( { min: 3 } ),
        check( 'email', 'not a valid email' ).isEmail(),
        check( 'email' ).custom( emailExiste ),
        validarCampos
    ],
    usuariosPost );

// UPDATE A USER
router.put( '/:id',
    [
        validarJWT,
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

module.exports = router;