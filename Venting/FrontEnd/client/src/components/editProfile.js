
// IMPORTS
import React from 'react'
import axios from 'axios'
import '../styles/profile.css'

export default class EditProfile extends React.Component {
    state = {
        userData: {},
        errorMessage: ''
    }

    componentDidMount() {
        const id = window.location.href.toString().split(window.location.host)[1].replace( '/' , '' ).replace( 'Edit' , '' ).replace( '/' , '' )
        const token = localStorage.getItem( 'jwt' )
        axios
            .get(`http://localhost:3000/users/${id}` , { headers: { Authorization: token }} )
            .then(res => {
                this.setState({
                    userData: res.data
                });
                console.log( 'userDATA' , this.state.userData )

            })
            .catch(error => console.error(error));

    }

    update = event => {
        event.preventDefault();
        console.log( this.state.userData )
        if ( this.state.userData.profileUrl === null ) {
            this.state.userData.profileUrl = "https://www.dts.edu/wp-content/uploads/sites/6/2018/04/Blank-Profile-Picture.jpg"
        }
        const id = window.location.href.toString().split(window.location.host)[1].replace( '/' , '' ).replace( 'Edit' , '' ).replace( '/' , '' )
        const token = localStorage.getItem( 'jwt' )
        axios
            .put(`http://localhost:3000/users/${id}` , this.state.userData , { headers: { Authorization: token }} )
            .then(res => {
                console.log( res.data )
                this.props.history.push( '/MyAccount/' )
            })
            // .catch(error => console.error(error) , this.setState({ errorMessage: 'Error, please try again.' }));

    }

    changeHandler = event => {
        event.preventDefault();
        this.setState({
            userData: {
                ...this.state.userData,
                [ event.target.name ]: event.target.value
            }
        });
    };

    clearError = event => {
        event.preventDefault();
        this.setState({ errorMessage: '' })
    }

    render() {

        console.log( this.state.userData )

        return(
            <div className = 'profileEditForm'>

                { this.state.errorMessage === '' ? null : (
                    <div className = 'errorMessage'>
                        <p>{ this.state.errorMessage }</p>
                        <button onClick = { this.clearError } className = 'ex'>x</button>
                    </div>
                )}

                <form className = 'profileEditForm' onSubmit = { this.update }>

                    <label>- Edit Profile -</label>

                    <div className = 'editProfilepicture'>
                        <img src = {this.state.userData.profileUrl} alt = 'profile'/>
                    </div>

                    <p>Profile Url</p>

                    <input
                        id = 'profileUrl'
                        type = 'text'
                        name = 'profileUrl'
                        value = { this.state.userData.profileUrl }
                        placeholder = 'Profile Image Url'
                        onChange = { this.changeHandler }
                    />

                    <p>Username</p>

                    <input
                        id = 'username'
                        type = 'text'
                        name = 'username'
                        value = { this.state.userData.username }
                        placeholder = 'username'
                        onChange = { this.changeHandler }
                    />

                    <p>Bio</p>

                    <input
                        id = 'bio'
                        type = 'text'
                        name = 'bio'
                        value = { this.state.userData.bio }
                        placeholder = 'bio'
                        onChange = { this.changeHandler }
                    />

                    <button type = 'submit' className = 'submitButton' > Update </button>

                </form>
            </div>
        )
    }
}