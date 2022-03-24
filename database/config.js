const mongoose = require( 'mongoose' );


const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN );

        console.log( 'Database is online' );
    } catch ( error ) {
        console.warn( error );
        throw new Error( 'Something went wrong initializing the DB' );
    }
}


module.exports = {
    dbConnection
}
