//IMPORTS
const db = require( '../../data/dbConfig' );
const map = require( './map' );

//EXPORTS
module.exports = {
    get,
    insert,
    update,
    remove
};

//GET ALL commentS ( FUNCTION )
function get( id ) {
    let query = db( 'comments' );
    if ( id ) {
        return query
            .where( 'comments.id' , id )
            .first()
            .then( comment => map.toggleComment( comment ))
    }
    return query.then( comments => {
        return comments.map( comment => map.toggleComment( comment ))
    })
};

//ADD AN comment ( FUNCTION )
function insert( comment ) {
    return db( 'comments' )
        .insert( comment )
        .then(([ id ]) => this.get( id ));
};

//UPDATE AN comment ( FUNCTION )
function update( id , changes ) {
    return db( 'comments' )
        .where( 'id' , id )
        .update( changes )
        .then( count => ( count > 0 ? this.get( id ) : null));
};

//DELETE AN comment ( FUNCTION )
function remove( id ) {
    return db( 'comments' )
        .where( 'id' , id )
        .del();
};