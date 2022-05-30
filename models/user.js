
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

/* UsuarioSchema.pre( 'findByIdAndDelete', function ( next ) {
    const personId = this._id;
    mongoose.model( "note" ).deleteMany( { 'user': personId }, function ( err, result ) {
        if ( err ) {
            console.log( `[error] ${err}` );
            next( err );
        } else {
            console.log( 'success' );
            next();
        }
    } );
} ); */


UsuarioSchema.methods.toJSON = function () {
    const { __v, password, createdAt, updatedAt, ...usuario } = this.toObject();

    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
