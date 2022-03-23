const { Router } = require( 'express' );

const { esAdminRole, validarJWT } = require( "../middlewares" );
const { searchNotes, searchUsers, allUsers, allNotes } = require( '../controllers/search' );

const router = Router();

// ONLY ADMINS CAN GET THIS END POINTS

router.get( '/users/', [ validarJWT, esAdminRole ], allUsers );

router.get( '/users/:term', [ validarJWT, esAdminRole ], searchUsers );

router.get( '/notes/', [ validarJWT, esAdminRole ], allNotes );

router.get( '/notes/:term', [ validarJWT, esAdminRole ], searchNotes );


module.exports = router;