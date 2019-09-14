
// IMPORTS
import React from 'react'
import axios from 'axios'
import '../styles/profile.css'

export default class EditProfile extends React.Component {
    state = {
        postData: {
            postDescription: '',
            postName: localStorage.getItem( 'username' ),
            username: localStorage.getItem( 'username' ),
            picture: ''
        },
        errorMessage: ''
    }

    componentDidMount() {
        const id = window.location.href.toString().split(window.location.host)[1].replace( '/' , '' ).replace( 'EditPost' , '' ).replace( '/' , '' )
        const token = localStorage.getItem( 'jwt' )
        axios
            .get(`http://localhost:3000/posts/${id}` , { headers: { Authorization: token }} )
            .then(res => {
                this.setState({
                    postData: res.data
                });
                console.log( 'postDATA' , this.state.postData )

            })
            .catch(error => console.error(error));

    }

    update = event => {
        event.preventDefault();
        const id = window.location.pathname.replace( '/' , '' ).replace( 'EditPost' , '' ).replace( '/' , '' )
        const direct = Number( id )
        const token = localStorage.getItem( 'jwt' )
        const send = { picture: this.state.postData.picture, postName: this.state.postData.postName, postDescription: this.state.postData.postDescription, username: this.state.postData.username }
        axios
            .put(`http://localhost:3000/posts/${direct}` , send , { headers: { Authorization: token }} )
            .then(res => {
                console.log( res.data )
                this.props.history.push( `/Post/${direct}` )
            })
            // .catch(error => console.error(error) , this.setState({ errorMessage: 'Error, please try again.' }));

    }

    changeHandler = event => {
        event.preventDefault();
        this.setState({
            postData: {
                ...this.state.postData,
                [ event.target.name ]: event.target.value
            }
        });
    };

    clearError = event => {
        event.preventDefault();
        this.setState({ errorMessage: '' })
    }

    render() {

        return(
            <div className = 'profileEditForm'>

                { this.state.errorMessage === '' ? null : (
                    <div className = 'errorMessage'>
                        <p>{ this.state.errorMessage }</p>
                        <button onClick = { this.clearError } className = 'ex'>x</button>
                    </div>
                )}

                <form className = 'profileEditForm' onSubmit = { this.update }>

                    <label>- Edit Post -</label>

                    {/* <div className = 'editpicture'>
                        <img src = {this.state.postData.picture} alt = 'profile'/>
                    </div> */}

                    <p>Picture Url</p>

                    <input
                        id = 'picture'
                        type = 'text'
                        name = 'picture'
                        value = { this.state.postData.picture }
                        placeholder = 'Image Url'
                        onChange = { this.changeHandler }
                    />

                    <p>Comment</p>

                    <input
                        id = 'postDescription'
                        type = 'text'
                        name = 'postDescription'
                        value = { this.state.postData.postDescription }
                        placeholder = 'Comment'
                        onChange = { this.changeHandler }
                    />

                    <button type = 'submit' className = 'submitButton' > Update </button>

                </form>
            </div>
        )
    }
}