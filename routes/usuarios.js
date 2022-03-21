
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validarCampos, validarJWT, esAdminRole } = require( '../middlewares' );


const { emailExiste, existeUsuarioPorId } = require( '../helpers/db-validators' );

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require( '../controllers/usuarios' );

const router = Router();


router.get( '/', usuariosGet );

// UPDATE A USER
router.put( '/:id',
    [
        check( 'id', 'No es un ID válido' ).isMongoId(),
        check( 'id' ).custom( existeUsuarioPorId ),
        check( 'role', 'No es un rol válido' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
        validarCampos
    ],
    usuariosPut );


// CREATE A NEW USER
router.post( '/',
    [
        check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'password', 'El password debe de ser más de 2 letras' ).isLength( { min: 2 } ),
        check( 'correo', 'El correo no es válido' ).isEmail(),
        check( 'correo' ).custom( emailExiste ),
        check( 'role', 'No es un rol válido' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
        //check( 'role' ).custom( esRoleValido ),
        validarCampos
    ],
    usuariosPost );

// DELETE A USER
router.delete( '/:id',
    [
        validarJWT,
        // esAdminRole,
        //tieneRole( 'ADMIN_ROLE', 'VENTAR_ROLE', 'USER_ROLE', 'OTRO_ROLE' ),
        check( 'id', 'No es un ID válido' ).isMongoId(),
        check( 'id' ).custom( existeUsuarioPorId ),
        validarCampos
    ],
    usuariosDelete );

module.exports = router;