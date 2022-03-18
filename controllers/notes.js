const { response } = require( "express" );
const Note = require( '../models/note' );

// GET ALL NOTES FROM USER
const notesGet = async ( req, res = response ) => {
    try {
        const { user } = req;
        const notes = await Note.find( { user } );
        if ( notes.length === 0 ) return res.json( { msg: 'no hay notas registradas para este usuario' } )
        res.json( notes );
    } catch ( error ) {
        res.json( { msg: 'algo salio mal', error } );
    }
}

// CREATE A  NEW POST
const notesPost = ( req, res = response ) => {
    const { title, description, user } = req.body;
    const note = new Note( { title, description, user } );

    // guardar en db
    note.save();

    res.json( { msg: 'note added succesfully!', note } );
}

// GET A NOTE BY ITS ID
const notesGetByID = async ( req, res = response ) => {
    try {

        const { id: noteID } = req.params;
        const { _id: userID } = req.user;

        const note = await Note.findOne( { $and: [ { user: userID }, { _id: noteID } ] } );

        if ( !note ) return res.json( { msg: 'forbidden' } );

        res.json( note );
    } catch ( err ) {
        console.warn( err );
    }
}


module.exports = { notesGet, notesPost, notesGetByID };