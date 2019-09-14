
//IMPORTS ⬇︎ 
const express = require( 'express' );
const server = express();
const helmet = require( 'helmet' );
const morgan = require( 'morgan' );
const cors = require( 'cors' );

//ROUTERS ⬇︎
const authenticationRouter = require( '../routes/auth/authrouter' );
const userRouter = require( '../routes/users/user-router' );
const postRouter = require( '../routes/posts/post-router' );
const commentsRouter = require( '../routes/comments/comments-router' );



// APPLYING MIDDLEWARE ⬇︎
server.use( express.json() );
server.use( cors() );
server.use( helmet() );
server.use( morgan( 'short' ) );

// ROUTE EXTENSIONS ⬇︎
server.use( '/auth' , authenticationRouter );
server.use( '/users' , userRouter );
server.use( '/posts' , postRouter );
server.use( '/comments' , commentsRouter );

// SANITY CHECK ⬇︎
server.get( '/' , ( req , res ) => {
    res.send( 'IM ALIVE' );
})

// EXPORTS ⬇︎
module.exports = server;


// BATTERIES INCLUDED ⬇︎

// SANITY CHECK
// GET http://localhost:3000

// REGISTER
// POST http://localhost:3000/auth/register
// { "username": "Max" , "password": "Gunter" }
// recieve a token

// LOGIN
// POST http://localhost:3000/auth/login
// HEADERS Authorization: token^
// { "username": "Max" , "password": "Gunter" }

// GET ALL POSTS
// GET http://localhost:3000/posts
// HEADERS Authorization: token^

// GET SINGLE POSTS
// GET http://localhost:3000/posts/id
// HEADERS Authorization: token^

// POST SOMETHING
// POST http://localhost:3000/posts
// { "post": "hello" }

// UPDATE POST
// PUT http://localhost:3000/posts/( id of post )
// { "post": "Hello There!" }

// Delete POST
// DELETE http://localhost:3000/posts/( id of post )