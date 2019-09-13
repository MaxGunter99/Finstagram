
exports.up = function(knex) {
    return knex.schema.createTable( 'posts' , post => {
    
        post.increments();

        post
            .string( 'username' )
            .notNullable();

        post
            .string( 'post' )
            .notNullable();

        post.timestamps( true , true )

    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists( 'posts' )
};
