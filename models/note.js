const { Schema, model } = require( 'mongoose' );

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

NoteSchema.methods.toJSON = function () {
    const { __v, updatedAt, ...note } = this.toObject();

    return note;
}

module.exports = model( 'Note', NoteSchema );
