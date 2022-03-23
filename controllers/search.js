const { response } = require( "express" )
const { ObjectId } = require( 'mongoose' ).Types;

const Usuario = require( '../models/user' );
const Note = require( '../models/note' );

// get a list of all users
const allUsers = async ( req, res = response ) => {
    try {
        const [ total, usuarios ] = await Promise.all( [
            Usuario.countDocuments(),
            Usuario.find()
        ] );

        res.status( 200 ).json( {
            total,
            usuarios
        } );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}

// search for something in a user or users 
// fields to search are name, email and role
const searchUsers = async ( req, res = response ) => {
    try {
        const { term } = req.params;
        const isMongoID = ObjectId.isValid( term );

        if ( isMongoID ) {
            const user = await Usuario.findById( term )
            if ( !user ) return res.status( 401 ).json( { msg: 'user not found' } );
            return res.status( 201 ).json( user );
        }
        const regex = new RegExp( term, 'i' );
        const [ total, users ] = await Promise.all( [
            Usuario.countDocuments( { $or: [ { nombre: regex }, { correo: regex }, { role: regex } ] } ),
            Usuario.find( { $or: [ { nombre: regex }, { correo: regex }, { role: regex } ] } )
        ] );

        res.json( { total, users } )
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }

}

// get a list of all notes
const allNotes = async ( req, res = response ) => {
    try {
        const [ total, notes ] = await Promise.all( [
            Note.countDocuments(),
            Note.find()
        ] );

        res.status( 200 ).json( {
            total,
            notes
        } );
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}

// search for something in a note or notes
// fields to search are title and description
const searchNotes = async ( req, res = response ) => {
    try {
        const { term } = req.params;
        const isMongoID = ObjectId.isValid( term );

        if ( isMongoID ) {
            const note = await Note.findById( term )
            if ( !note ) return res.status( 401 ).json( { msg: 'note not found' } );
            return res.status( 201 ).json( note );
        }
        const regex = new RegExp( term, 'i' );
        const [ total, notes ] = await Promise.all( [
            Note.countDocuments( { $or: [ { title: regex }, { description: regex } ] } ),
            Note.find( { $or: [ { title: regex }, { description: regex } ] } ).populate( 'user', 'nombre' )
        ] );

        res.json( { total, notes } )
    } catch ( error ) {
        console.warn( error );
        res.status( 500 );
    }
}


module.exports = { allUsers, searchUsers, allNotes, searchNotes } 