
// IMPORTS ⬇︎
const router = require( 'express' ).Router()
const posts = require( './post-model' );
const restricted = require( '../auth/restricted-middleware' );

// GET ALL POSTS ⬇︎
router.get( '/' , restricted , ( req , res ) => {
    posts.find()
        .then( posts => {
            res.json( posts )
        }) 
        .catch( error => {
            res.status( 500 ).json({ message: 'Server error getting all posts' , error })
        })
});

// ADD POST ⬇︎
router.post( '/' , async ( req , res ) => {
    const info = req.body;
    if ( info.post ){
        try {
            const inserted = await posts.add( info );
            res.status( 200 ).json({ message: 'Success!' , inserted })
        } catch ( error ) {
            res.status( 500 ).json({ message: 'error adding a post! rip' , error })
        }
    } else {
        res.status( 400 ).json({ message: 'Missing post info, try again' })
    }
});

// GET Single POST ⬇︎
router.get( '/:id' , restricted , ( req , res ) => {
    let id = req.params.id;
    posts.findById( id )
        .then( posts => {
            res.json( posts )
        }) 
        .catch( error => {
            res.status( 500 ).json({ message: 'Server error getting post' , error })
        })
});

// DELETE POST ⬇︎
router.delete( '/:id' , async ( req, res ) => {
    try {
        const howMany = await posts.remove( req.params.id );
        if ( howMany > 0 ) {
            res.status( 200 ).json({ message: 'Post has been abliterated ;)' });
        } else {
            res.status( 404 ).json({ message: 'Post is not found, cannot be abliterated :(' });
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({ message: 'Internal error abliterating post' , error });
    }
});

// UPDATE POST ⬇︎
router.put( '/:id' , async ( req, res ) => {
    try {
        const post = await posts.update( req.params.id, req.body );
        if ( post ) {
            res.status( 200 ).json( post );
        } else {
            res.status( 400 ).json({ message: 'Post cannot be found' });
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({ message: 'Error updating the Post' });
    }
});

// EXPORTS ⬇︎
module.exports = router;
