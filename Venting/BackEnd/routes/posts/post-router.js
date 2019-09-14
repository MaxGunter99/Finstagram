
//IMPORTS
const express = require( 'express' );
const router = express.Router();
const posts = require( '../helpers/post-model' );

//GET ALL postS
router.get( '/' , ( req , res ) => {
    posts.get()
    .then( post => {
        res.status( 200 ).json( post );
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error getting all posts' , error });
    })
});

//GET INDIVIDUAL postS
router.get( '/:id' , ( req , res ) => {
    const { id } = req.params;
    posts.get( id )
    .then( post => {
        res.status( 200 ).json( post );
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error getting individual post' , error })
    })
});

//GET postS commentS
router.get( '/:id/comments' , ( req , res ) => {
    const { id } = req.params;
    posts.getComments( id )
    .then( comments => {
        if ( comments ) {
            res.status( 200 ).json( comments );
        } else {
            res.status( 404 ).json({ message: 'There are no comments for this post yet' });
        }
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error getting comments' , error });
    })
});

//ADD post
router.post( '/' , ( req , res ) => {
    const post = req.body;
    if ( post.postName && post.postDescription ) {
        if ( post.postName.length < 128 ) {
            posts.insert( post )
            .then( newPost => {
                res.status( 201 ).json( newPost );
            })
            .catch( error => {
                res.status( 500 ).json({ message: 'Server error adding post' , error });
            })
        } else {
            res.status( 405 ).json({ message: 'post name is longer than 128 characters ( unacceptable )' });
        }
    } else {
        res.status( 406 ).json({ message: 'post name or Description field is empty' });
    }
});

//UPDATE post
router.put( '/:id' , ( req , res ) => {
    const { id } = req.params;
    const post = req.body;
    if ( post.postName && post.postDescription ) {
        if ( post.postName.length < 128 ) {
            posts.update( id , post )
            .then( updatedPost => {
                res.status( 200 ).json( updatedPost );
            })
            .catch( error => {
                res.status( 404 ).json({ message: 'post not found' , error });
            })
        } else {
            res.status( 405 ).json({ message: 'post name is longer than 128 characters ( unacceptable )' });
        }
    } else {
        res.status( 400 ).json({ message: 'post name & or Description is the same as current name or description' });
    }
});

//DELETE post
router.delete( '/:id' , ( req, res ) => {
    const { id } = req.params;
    posts.remove( id )
    .then( count => {
        if ( count ) {
            res.status( 200 ).json({ message: 'post successfully Deleted' , count });
        } else {
            res.status( 404 ).json({ message: 'Can not find post to Delete' });
        }
    })
    .catch( err => {
        res.status(500).json({ message: 'Server error deleting post' });
    })
});

module.exports = router;
