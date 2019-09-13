
// IMPORTS ⬇︎
import React from 'react';
import '../styles/forms.css'
import axios from 'axios';

export default class AddPost extends React.Component {

    state = {
        postInfo: {
            username: localStorage.getItem( 'username' ),
            post: ''
        },
        errorMessage: ''
    }

    post = event => {
        const token = localStorage.getItem( 'jwt' )
        event.preventDefault();
        console.log( this.state.postInfo )
        axios.post( 'http://localhost:3000/posts' , this.state.postInfo , { header: { Authorization: token } } )
            .then(res => {

                console.log( res.data )
                this.props.history.push( '/Posts' )
            })
            .catch(error => {
                console.log( 'Error creating post' , error )
                this.setState({ errorMessage: 'Create post error, please try again.' })
            })
    }

    changeHandler = event => {
        event.preventDefault();
        this.setState({
            postInfo: {
                ...this.state.postInfo,
                [event.target.name]: event.target.value
            }
        });
    };

    clearError = event => {
        event.preventDefault();
        this.setState({ errorMessage: '' })
    }

    render() {
        return (
            <div className ='FormContainer'>
                
                { this.state.errorMessage === '' ? null : (
                    <div className = 'errorMessage'>
                        <p>{ this.state.errorMessage }</p>
                        <button onClick = { this.clearError } className = 'ex'>x</button>
                    </div>
                ) }

                <form onSubmit = { this.post } >
                    <label>Create Post</label>
                    <input
                        id = 'post'
                        type = 'text'
                        name = 'post'
                        value = { this.state.postInfo.post }
                        placeholder = 'Say anything . . .'
                        onChange = { this.changeHandler }
                    />

                    <button type = 'submit' className = 'submitButton' > Post </button>

                </form>
            </div>
        )
    }

}