//EXPORTS
module.exports = {
    integerToBoolean,
    booleanToInteger,
    togglePost,
    toggleComment
}

//INITIATE NUMBER TO TRUE OR FALSE ( FUNCTION )
function integerToBoolean ( integer ) {
    return integer === 1 ? true : false;
};

//INITIATE TRUE OR FALSE TO NUMBER ( FUNCTION )
function booleanToInteger ( boolean ) {
    return boolean === true ? 1 : 0;
};

//TOGGLE post COMPLETED ( FUNCTION )
function togglePost ( post ) {
    const result = {
        ...post,
        postCompleted: integerToBoolean( post.postCompleted )
    };

    if ( post.comments ) {
        result.comments = post.comments.map( comment => ({
            ...comment,
            commentCompleted: integerToBoolean( comment.commentCompleted )
        }));
    }

    return result;

};

//TOGGLE comment COMPLETED ( FUNCTION )
function toggleComment ( comment ) {
    return {
        ...comment,
        commentCompleted: integerToBoolean( comment.commentCompleted )
    };
};