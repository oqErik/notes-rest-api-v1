const { Router } = require( "express" );
const { check } = require( 'express-validator' );
const router = Router();
const { validarCampos, validarJWT } = require( "../middlewares" );

const {
    notesGet,
    notesPost,
    notesGetByID,
    notesPut,
    notesDelete } = require( "../controllers/notes" );

// GET ALL NOTES FROM A SPECIFIC USER
router.get( '/', [ validarJWT ], notesGet );

// GET A NOTE FROM A SPECIFIC USER
router.get( '/:id',
    [
        validarJWT,
        check( 'id', 'No es un ID válido' ).isMongoId(),
        validarCampos
    ],
    notesGetByID );


// CREATE A NEW NOTE
router.post( '/',
    [
        validarJWT,
        check( 'title', 'el titulo esta vacio' ).not().isEmpty(),
        check( 'description', 'La descripcion debe de ser más de 6 letras' ).isLength( { min: 6 } ),
        validarCampos
    ],
    notesPost );

// UPDATE A NOTE
router.put( '/:id',
    [
        validarJWT,
        check( 'id', 'No es un id valido' ).isMongoId(),
        check( 'title', 'el titulo esta vacio' ).not().isEmpty(),
        check( 'description', 'La descripcion debe de ser más de 6 letras' ).isLength( { min: 6 } ),
        validarCampos
    ],
    notesPut );

// DELETE A NOTE
router.delete( '/:id',
    [
        validarJWT,
        check( 'id', 'No es un id valido' ).isMongoId(),
        validarCampos
    ],
    notesDelete );


module.exports = router;