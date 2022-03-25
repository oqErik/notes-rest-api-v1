const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validarCampos } = require( '../middlewares/validar-campos' );
const { login } = require( '../controllers/auth' );

const router = Router();

router.post( '/login', [
    check( 'email', 'Email not valid' ).isEmail(),
    check( 'password', 'Password is empty' ).not().isEmpty(),
    validarCampos
], login );


module.exports = router;