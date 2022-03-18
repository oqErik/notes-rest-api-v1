const { Router } = require( "express" );
const { check } = require( 'express-validator' );
const router = Router();
const { validarCampos, validarJWT } = require( "../middlewares" );

const { notesGet,
    notesPost,
    notesGetByID
} = require( "../controllers/notes" );


router.get( '/', [ validarJWT ], notesGet );

router.get( '/:id',
    [
        validarJWT,
        check( 'id', 'No es un ID válido' ).isMongoId(),
        validarCampos
    ],
    notesGetByID );



router.post( '/',
    [
        validarJWT,
        check( 'user', 'usuario no valido' ).isMongoId,
        check( 'title', 'el titulo esta vacio' ).not().isEmpty(),
        check( 'description', 'La descripcion debe de ser más de 6 letras' ).isLength( { min: 6 } ),
        validarCampos
    ],
    notesPost );

module.exports = router;