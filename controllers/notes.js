const { response } = require( "express" );
const Note = require( '../models/note' );

// GET ALL NOTES FROM USER
const notesGet = async ( req, res = response ) => {
    try {
        const { user } = req;
        const notes = await Note.find( { user } );
        if ( notes.length === 0 ) return res.status( 202 ).json( { msg: 'there are no notes from this user yet' } );
        res.status( 200 ).json( notes );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}

// CREATE A  NEW POST
const notesPost = ( req, res = response ) => {
    try {
        const { title, description } = req.body;
        const user = req.user._id;
        const note = new Note( { title, description, user } );
        note.save();

        res.status( 201 ).json( { msg: 'note added succesfully!', note } );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}

// GET A NOTE BY ITS ID
const notesGetByID = async ( req, res = response ) => {
    try {
        const { id: noteID } = req.params;
        //const note = await Note.findOne( { $and: [ { user: req.user._id }, { _id: noteID } ] } );
        const note = await Note.findOne( { user: req.user._id, _id: noteID } );
        if ( !note ) return res.status( 401 ).json( { msg: 'Note dosnt exist' } );

        res.status( 200 ).json( note );
    } catch ( err ) {
        console.warn( err );
        res.status( 500 );
    }
}


// UPDATE A NOTE
const notesPut = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        //const note = await Note.findOneAndUpdate( { $and: [ { _id: id }, { user: req.user._id } ] }, { title, description } );
        const note = await Note.findOneAndUpdate( { _id: id, user: req.user._id }, { title, description } );
        if ( !note ) return res.status( 401 ).json( { msg: 'Note dosnt exist' } );

        res.status( 200 ).json( { msg: 'Note updated succesfuly' } )
    } catch ( err ) {
        console.warn( err );
        res.status( 500 );
    }
}

// DELETE A NOTE
const notesDelete = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        //const note = await Note.findOneAndDelete( { $and: [ { _id: id }, { user: req.user._id } ] } );
        const note = await Note.findOneAndDelete( { _id: id, user: req.user._id } );
        if ( !note ) return res.status( 401 ).json( { msg: 'Note dosnt exist' } );

        res.status( 200 ).json( { msg: 'Note deleted succesfuly' } )
    } catch ( err ) {
        console.warn( err );
        res.status( 500 );
    }
}

module.exports = { notesGet, notesPost, notesGetByID, notesPut, notesDelete };