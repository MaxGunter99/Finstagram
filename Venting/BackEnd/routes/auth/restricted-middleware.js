// IMPORTS ⬇︎
const jwt = require( 'jsonwebtoken' );
const secret = require( '../../config/secrets' );

// EXPORTS ⬇︎
module.exports = ( req , res , next ) => {
    const token = req.headers.authorization;
    if ( token ) {
        jwt.verify( token , secret.jwtSecret , ( error , decodedToken ) => {
            if ( error ) {
                res.status( 401 ).json({ message: 'Sorry but your token is not verified from the restricted middleware' , error })
            } else {
                req.decodedJwt = decodedToken;
                next()
            }
        })
    } else {
        res.status( 401 ).json({ message: 'Sorry but you dont have a token ( to play space invaders 👾 )' })
    }
}