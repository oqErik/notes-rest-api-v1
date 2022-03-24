const { Schema, model } = require( 'mongoose' );
const { UserSchema } = require( '../models/user' )
const NoteSchema = Schema( {
    title: {
        type: String,
        required: [ true, 'title is empty' ]
    },
    description: {
        type: String,
        required: [ true, 'description is empty' ]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'user is empty' ]
    }

}, {
    timestamps: true
} );


module.exports = model( 'Note', NoteSchema );
