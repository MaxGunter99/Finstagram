
//COMMENTS TABLE SETUP
exports.up = function(knex, Promise) {
    return knex.schema.createTable( 'comments' , tbl => {
        tbl.increments();
        tbl.string( 'commentDescription' ).notNullable();
        tbl.string( 'notes' );
        tbl.boolean( 'commentCompleted' ).defaultTo( false );
        tbl.integer( 'postId' ).unsigned();
        tbl.foreign( 'postId' ).references( 'id' ).on( 'posts' );
    });
};

//ELSE
exports.down = function( knex, Promise ) {
    return knex.schema.dropTableIfExists( 'comments' );
};
