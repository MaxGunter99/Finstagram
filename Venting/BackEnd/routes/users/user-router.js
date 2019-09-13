// IMPORTS ⬇︎
const router = require( 'express' ).Router();
const users = require( './user-model' );
const restricted = require( '../auth/restricted-middleware' )

// GET ALL USERS ⬇︎
router.get( '/users' , restricted , ( req , res ) => {
    users.find()
        .then( users => {
            res.status( 200 ).json({ message: 'Get users success' , users })
        })
        .catch( error => {
            res.status( 500 ).json({ message: 'Error getting users' , error })
        })
})

// EXPORTS ⬇︎
module.exports = router;
