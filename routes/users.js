
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT, validarUser } = require( '../middlewares' );


const { emailExiste } = require( '../helpers/db-validators' );

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete } = require( '../controllers/users' );

const router = Router();

// CREATE A NEW USER
router.post( '/',
    [
        check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'password', 'El password debe de ser más de 2 letras' ).isLength( { min: 2 } ),
        check( 'correo', 'El correo no es válido' ).isEmail(),
        check( 'correo' ).custom( emailExiste ),
        check( 'role', 'No es un rol válido' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
        validarCampos
    ],
    usuariosPost );

// UPDATE A USER
router.put( '/:id',
    [
        validarJWT,
        check( 'id', 'No es un ID válido' ).isMongoId(),
        check( 'role', 'No es un rol válido' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
        validarCampos
    ],
    usuariosPut );

// DELETE A USER
router.delete( '/:id',
    [
        validarJWT,
        check( 'id', 'No es un ID válido' ).isMongoId(),
        validarUser,
        validarCampos
    ],
    usuariosDelete );

module.exports = router;