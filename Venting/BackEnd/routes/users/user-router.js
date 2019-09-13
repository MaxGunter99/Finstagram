// IMPORTS ⬇︎
const router = require( 'express' ).Router();
const users = require( './user-model' );
const restricted = require( '../auth/restricted-middleware' )

// GET ALL USERS ⬇︎
router.get( '/' , restricted , ( req , res ) => {
    users.find()
        .then( users => {
            res.status( 200 ).json({ message: 'Get users success' , users })
        })
        .catch( error => {
            res.status( 500 ).json({ message: 'Error getting users' , error })
        })
})

// GET ONE USER BY ID
router.get( '/:id' , restricted , ( req , res ) => {
    let id = req.params.id;
    users.findById( id )
        .then( users => {
            res.json( users )
        }) 
        .catch( error => {
            res.status( 500 ).json({ message: 'Server error getting user' , error })
        })
});

// GET ONE USER BY USERNAME
router.get( '/:username' , restricted , ( req , res ) => {
    let username = req.params.username;
    console.log( username )
    users.findById( username )
        .then( users => {
            res.json( users )
        }) 
        .catch( error => {
            res.status( 500 ).json({ message: 'Server error getting user' , error })
        })
});

// UPDATE USER ⬇︎
router.put( '/:id' , async ( req, res ) => {
    try {
        const user = await users.update( req.params.id, req.body );
        if ( user ) {
            res.status( 200 ).json( user );
        } else {
            res.status( 400 ).json({ message: 'Post cannot be found' });
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({ message: 'Error updating the User' });
    }
});

// EXPORTS ⬇︎
module.exports = router;
