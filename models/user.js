
const { Schema, model } = require( 'mongoose' );

const UsuarioSchema = Schema( {
    name: {
        type: String,
        required: [ true, 'name is empty' ]
    },
    email: {
        type: String,
        required: [ true, 'email  is empty' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'password  is empty' ],
    },
    img: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
} );

// Cascaade deleting
UsuarioSchema.pre( 'deleteOne', { document: true }, function ( next ) {
    this.model( 'Note' ).deleteMany( { user: this._id }, next );
} );

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, createdAt, updatedAt, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
