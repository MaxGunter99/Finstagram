
exports.up = function(knex , Promise) {
    return knex.schema
    
        .createTable( 'posts' , post => {
    
            post.increments();

            post
                .string( 'likes' )
                .defaultTo( '0' )

            post
                .string( 'username' )
                .notNullable();

            post
                .string( 'picture' )

            post.timestamps( true , true )

            post.string( 'postName' ).notNullable();
            post.string( 'postDescription' ).notNullable();
            post.boolean( 'postCompleted' ).defaultTo( false );


    }) 
};

exports.down = function(knex , Promise) {
    return knex.schema.dropTableIfExists( 'posts' )
};
