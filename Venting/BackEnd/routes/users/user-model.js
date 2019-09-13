
// SET UP DATABASE ⬇︎
const db = require( '../../data/dbConfig' );

// EXPORTS ⬇︎
module.exports = {
    add,
    find,
    findBy,
    findById

};

// WORKING OUT USER FUNCTIONS ⬇︎
async function add( user ) {
    const [ id ] = await db( 'users' ).insert( user )
    return( findById( id ) );
};

function find() {
    return db( 'users' );
};

function findBy( user ) {
    return ( db( 'users' ).where( user ) );
};

function findById( id ) {
    return db( 'users' )
        .select( 'id' , 'username' )
        .where({ id })
        .first();
};