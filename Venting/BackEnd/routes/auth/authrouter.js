
// IMPORTS ⬇︎
const router = require( 'express' ).Router()
const bcrypt = require( 'bcryptjs' )
const jwt = require( 'jsonwebtoken' )
const users = require( '../helpers/user-model' )

// ENDPOINTS ⬇︎

// REGISTER ⬇︎
router.post( '/register' , ( req , res ) => {

    if ( req.body.username && req.body.password ) {
        let user = req.body;
        const hash = bcrypt.hashSync( user.password , 10 );
        user.password = hash;
        users.add( user )
            .then( saved => {
                res.status( 201 ).json({ message: 'Successfully Registered!' , saved })
            })
            .catch( error => {
                res.status( 500 ).json({ message: 'Server error' , error })
            })

    } else {
        res.status( 406 ).json({ message: 'Error Registering - Missing username or password' })
    }

})

// LOGIN ⬇︎
router.post( '/login' , ( req , res ) => {

    let { username , password } = req.body;
    if ( req.body.username && req.body.password ) {
        users.findBy({ username })
        .first()
        .then( user => {
            if( user && bcrypt.compareSync( password , user.password ) ) {
                const token = generateToken( user );
                res.status( 200 ).json({ message: `Login Success! Welcome ${ user.username } 👋🏼` , token })
            } else {
                res.status( 401 ).json({ message: 'Invalid Credentials, please try again.' })
            }
        })
        .catch( error => {
            res.status( 500 ).json({ message: 'Server error, please try again.' , error })
        })


    } else {
        res.status( 406 ).json({ message: 'Error Logging In - Missing username or password'  })
    }

}) 

function generateToken( user ) {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1 day'
    }

    return jwt.sign( payload , 'Add a .env file' , options )
}

module.exports = router;