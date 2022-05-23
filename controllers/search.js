const { response } = require( "express" )
const { ObjectId } = require( 'mongoose' ).Types;

const Usuario = require( '../models/user' );
const Note = require( '../models/note' );

// GET A LIST OF ALL USERS
const allUsers = async ( req, res = response ) => {
    try {
        const users = await Usuario.find()

        res.status( 200 ).json( { total: users.length, users } );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}

// SEARCH FOR SOMETHING IN A USER OR USERS 
// FIELDS TO SEARCH ARE NAME, EMAIL AND ROLE
const searchUsers = async ( req, res = response ) => {
    try {
        const { term } = req.params;
        //if mongo id is sent then they want a specific user
        const isMongoID = ObjectId.isValid( term );
        if ( isMongoID ) {
            const user = await Usuario.findById( term )
            if ( !user ) return res.status( 401 ).json( { errors: [ 'User not found' ] } );
            return res.status( 200 ).json( user );
        }

        //if not means the put a query to search
        const regex = new RegExp( term, 'i' );
        const users = await Usuario.find( { $or: [ { name: regex }, { email: regex } ] } );

        res.status( 200 ).json( { total: users.length, users } )
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }

}

// GET A LIST OF ALL NOTES
const allNotes = async ( req, res = response ) => {
    try {
        const notes = await Note.find().populate( 'user', [ 'name', 'email' ] )

        res.status( 200 ).json( { total: notes.length, notes } );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}

// SEARCH FOR SOMETHING IN A NOTE OR NOTES
// IF THE PARAM IS A MONGO ID IT WILL RETURN A UNIQUE NOTE
// IF THE PARAM IS IS A PHRASE IT WILL SEARCH FOR THAT PHRASE
// FIELDS TO SEARCH ARE TITLE, DESCRIPTION AND USER NAME 
const searchNotes = async ( req, res = response ) => {
    try {
        const { term } = req.params;
        //if mongo id is sent then they want a specific note
        const isMongoID = ObjectId.isValid( term );
        if ( isMongoID ) {
            const note = await Note.findById( term )
            if ( !note ) return res.status( 401 ).json( { errors: [ 'Note not found' ] } );
            return res.status( 200 ).json( note );
        }

        //if not means the put a query to search
        let notes = await Note.find().populate( 'user', [ 'name', 'email' ] );
        const regex = new RegExp( term, 'i' );

        notes = notes.filter( ( item ) => {
            if ( regex.test( item.title ) || regex.test( item.description ) || regex.test( item.user.name ) ) return item;
        } )

        res.status( 200 ).json( { total: notes.length, notes } )
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}


module.exports = { allUsers, searchUsers, allNotes, searchNotes } 