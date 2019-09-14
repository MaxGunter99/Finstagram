//IMPORTS
const express = require( 'express' );
const router = express.Router();
const comments = require( '../helpers/comments-model' );
const posts = require( '../helpers/post-model' );

//GET ALL commentS
router.get( '/' , ( req , res ) => {
    comments.get()
    .then( comments => {
        res.status( 200 ).json( comments );
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error getting all comments' , error })
    })
});

//GET INDIVIDUAL commentS
router.get( '/:id' , ( req , res ) => {
    const { id } = req.params;
    comments.get( id )
    .then( comment => {
        res.status( 200 ).json( comment )
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error getting individual comment' , error })
    })
});

//ADD A comment
router.post( '/' , ( req , res ) => {
    const comment = req.body;
    posts.get( comment.postId )
    .then( post => {
        if ( comment.commentDescription.length < 128 ) {
            if ( comment.commentDescription && comment.notes ) {
                comments.insert( comment )
                    .then( newComment => {
                        res.status( 201 ).json( newComment )
                    })
            } else {
                res.status( 406 ).json({ message: 'Description or Notes field is empty' });
            }
        } else {
            res.status( 405 ).json({ message: 'Description is longer than 128 characters ( unacceptable )' });
        }
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error creating comment', error });
    })
});

//UPDATE comment
router.put( '/:id' , ( req , res ) => {
    const { id } = req.params;
    const comment = req.body;
    if ( comment.commentDescription && comment.notes ) {
        if ( comment.commentDescription.length < 128 ) {
            comments.update( id, comment )
                .then( updatedComment => {
                    res.status( 200 ).json({ message: 'comment sucessfully updated' , updatedComment });
                })
                .catch( error => {
                    res.status( 404 ).json({ message: 'comment not found' , error });
                })
        } else {
            res.status( 405 ).json({ message: 'Updated Desctiption is longer than 128 characters ( unacceptable )' });
        }
    } else {
        res.status( 406 ).json({ message: 'Description or Notes field is empty' });
    }
});

//DELETE comment
router.delete( '/:id' , ( req , res ) => {
    const { id } = req.params;
    comments.remove( id )
    .then( comment => {
        if ( comment ) {
            res.status( 200 ).json({ message: 'comment sucessfully deleted:', comment });
        } else {
            res.status( 404 ).json({ message: 'Can not find comment to delete' });
        }
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error deleting comment' });
    })
});

module.exports = router;