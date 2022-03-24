
const { Schema, model } = require( 'mongoose' );

const UsuarioSchema = Schema( {
    nombre: {
        type: String,
        required: [ true, 'name is empty' ]
    },
    correo: {
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
    role: {
        type: String,
        required: true,
        emun: [ 'ADMIN_ROLE', 'USER_ROLE' ],
        default: 'USER_ROLE'
    }
}, {
    timestamps: true
} );



UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();

    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
