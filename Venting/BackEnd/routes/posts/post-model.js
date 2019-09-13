
// SET UP DATABASE ⬇︎
const db = require( '../../data/dbConfig' );

// EXPORTS ⬇︎
module.exports = {
    add,
    find,
    findBy,
    findById,
    remove,
    update
};

// WORKING OUT USER FUNCTIONS ⬇︎
function add( post ) {
    return db( 'posts' )
        .insert( post , 'id' )
        .then( ([ id ]) => {
            return findById( id )
        })
};

function find() {
    return db( 'posts' );
};

function findBy( user ) {
    return ( db( 'posts' ).where( user ) );
};

function findById( id ) {
    return db( 'posts' )
        .select( 'id' , 'post', 'username' )
        .where({ id })
        .first();
};

function remove(id) {
    return db( 'posts' )
      .where( 'id', id )
      .del();
}

function update( id, changes ) {
    return db('posts')
      .where( id )
      .update( changes );
}