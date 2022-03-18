const { Schema, model } = require( 'mongoose' );

const NoteSchema = Schema( {
    title: {
        type: String,
        required: [ true, 'El titulo es obligatorio' ]
    },
    description: {
        type: String,
        required: [ true, 'Nota vacia!' ]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'el usuario que crea esta vacio' ]
    }
} );


module.exports = model( 'Note', NoteSchema );
