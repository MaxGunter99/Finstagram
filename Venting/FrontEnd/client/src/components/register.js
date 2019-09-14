
// IMPORTS ⬇︎
import React from 'react';
import '../styles/forms.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Register extends React.Component {

    state = {
        userInfo: {
            username: '',
            password: ''
        },
        errorMessage: ''
    }

    register = event => {
        event.preventDefault();
        console.log( this.state.userInfo )
        axios.post( 'http://localhost:3000/auth/register' , this.state.userInfo )
            .then(res => {

                console.log( res.data )
                localStorage.setItem('jwt', res.data.token);
                localStorage.setItem( 'username' , this.state.userInfo.username )
                this.props.history.push( '/Posts' )
                
            })
            .catch(error => {
                console.log( 'Register Failure' , error )
                this.setState({ errorMessage: 'Register error, please try again.' })
            })
    }

    changeHandler = event => {
        event.preventDefault();
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [ event.target.name ]: event.target.value
            }
        });
    };

    clearError = event => {
        event.preventDefault();
        this.setState({ errorMessage: '' })
    }

    // submitDataHandler = event => {
    //     event.preventDefault();
    //     this.props.register( this.state.userInfo ).then( () => this.props.history.push( "/" ))
    // };

    render() {
        return (
            <div className ='FormContainer'>

                { this.state.errorMessage === '' ? null : (
                    <div className = 'errorMessage'>
                        <p>{ this.state.errorMessage }</p>
                        <button onClick = { this.clearError } className = 'ex'>x</button>
                    </div>
                )}

                <form onSubmit = { this.register } >

                    <label> Register </label>

                    <input
                        id = 'username'
                        type = 'text'
                        name = 'username'
                        value = { this.state.userInfo.username }
                        placeholder = 'Username'
                        onChange = { this.changeHandler }
                    />

                    <input
                        id = 'password'
                        type = 'password'
                        name = 'password'
                        value = { this.state.userInfo.password }
                        placeholder = 'Password'
                        onChange = { this.changeHandler }
                    />

                    <button type = 'submit' className = 'submitButton' > Done </button>

                    <div className = 'moreInfo'>
                        <p> Already have an account? </p>
                        <Link exact to = '/Login'>Login</Link>
                    </div>

                </form>

            </div>
        )
    }

}