//IMPORTS
const db = require( '../../data/dbConfig' );
const map = require( './map' );

//EXPORTS
module.exports = {
    get,
    getComments,
    insert,
    update,
    remove
};

//GETTING ALL postS ( FUNCTION )
function get( id ) {
    let query = db( 'posts AS p' );
    if ( id ) {
        query.where( 'p.id' , id ).first();
        const promise = [ query, this.getComments( id ) ];
        return Promise.all( promise ).then( function( results ) {
            let [ post , comments ] = results;
            post.comments = comments;
            return map.togglePost( post );
        })
    }
    return query.then( posts => {
        return posts.map( post => map.togglePost( post ));
    });
};

//GETTING postS commentS ( FUNCTION )
function getComments( postId ) {
    return db( 'comments' )
        .where( 'postId' , postId )
        .then( comments => comments.map( comment => map.toggleComment( comment )));
};

//ADDING postS ( FUNCTION )
function insert( post ) {
    return db( 'posts' )
        .insert( post )
        .then(([ id ]) => this.get( id ));
};

//UPDATING post ( FUNCTION )
function update( id , changes ) {
    return db( 'posts' )
        .where( 'id' , id )
        .update( changes )
        .then( count => ( count > 0 ? this.get( id ) : null ));
};

//DELETE A post ( FUNCTION )
function remove( id ) {
    return db( 'posts' )
        .where( 'id' , id )
        .del();
};