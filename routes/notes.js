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
        check( 'id', 'not a valid ID' ).isMongoId(),
        validarCampos
    ],
    notesGetByID );


// CREATE A NEW NOTE
router.post( '/',
    [
        validarJWT,
        check( 'title', 'title must be more than 3 letters ' ).isLength( { min: 3 } ),
        check( 'description', 'description must be more than 3 letters' ).isLength( { min: 3 } ),
        validarCampos
    ],
    notesPost );

// UPDATE A NOTE
router.put( '/:id',
    [
        validarJWT,
        check( 'id', 'not a valid ID' ).isMongoId(),
        check( 'title', 'title must be more than 3 letters ' ).isLength( { min: 3 } ),
        check( 'description', 'description must be more than 3 letters' ).isLength( { min: 3 } ),
        validarCampos
    ],
    notesPut );

// DELETE A NOTE
router.delete( '/:id',
    [
        validarJWT,
        check( 'id', 'not a valid ID' ).isMongoId(),
        validarCampos
    ],
    notesDelete );


module.exports = router;