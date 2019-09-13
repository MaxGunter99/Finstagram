
// IMPORTS ⬇︎
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/index';
import '../styles/forms.css'
import axios from 'axios';

class Login extends React.Component {

    state = {
        userInfo: {
            username: '',
            password: ''
        },
        errorMessage: ''
    }

    login = event => {
        event.preventDefault();
        axios.post( 'http://localhost:3000/auth/login' , this.state.userInfo )
            .then(res => {

                console.log( res.data )
                localStorage.setItem('jwt', res.data.token);
                localStorage.setItem( 'username' , this.state.userInfo.username )
                this.props.history.push( '/Posts' )
            })
            .catch(error => {
                console.log( 'Login Failure' , error )
                this.setState({ errorMessage: 'Login error, please try again.' })
            })
    }

    changeHandler = event => {
        event.preventDefault();
        this.setState({
            userInfo: {
                ...this.state.userInfo,
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

                <form onSubmit = { this.login } >
                    <label>Login</label>
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
                        type = 'text'
                        name = 'password'
                        value = { this.state.userInfo.password }
                        placeholder = 'Password'
                        onChange = { this.changeHandler }
                    />

                    <button type = 'submit' className = 'submitButton' > Login </button>

                </form>
            </div>
        )
    }

}

export default connect(
    null,
    { login }
)( Login )