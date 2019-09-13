
// SET UP DATABASE ⬇︎
const db = require( '../../data/dbConfig' );

// EXPORTS ⬇︎
module.exports = {
    add,
    find,
    findBy,
    findById,
    findByUsername,
    update
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
        .select( 'id' , 'username' , 'profileUrl' )
        .where({ id })
        .first();
};

function findByUsername( username ) {
    return db( 'users' )
        .select( 'id' , 'username' , 'profileUrl' )
        .where({ username })
        .first();
};

function update(id, changes) {
    return db('users')
      .where({ id })
      .update( changes );
}