
// USER TABLE SETUP ⬇︎
exports.up = function(knex) {
    return knex.schema.createTable( 'users' , users => {
  
        users.increments();

        users
            .string( 'profileUrl' , 300 )
            .unique();
      
        users
          .string( 'username' , 128 )
          .notNullable()
          .unique();

        users
            .string( 'bio' , 500 )
      
        users
          .string( 'password' , 128 )
          .notNullable();    
  
    })
};
  
    exports.down = function(knex) {
        return knex.schema.dropTableIfExists( 'users' )
};
