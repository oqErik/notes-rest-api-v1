

const validaCampos = require( '../middlewares/validar-campos' );
const validarJWT = require( '../middlewares/validar-jwt' );
const validaRoles = require( '../middlewares/validar-roles' );
const validarUser = require( '../middlewares/validar-user' )
module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarUser
}