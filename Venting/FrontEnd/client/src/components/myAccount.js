
import React from "react";
import axios from 'axios';
import '../styles/posts.css'
import { Link } from 'react-router-dom';
import Settings from '../Images/Settings.png'

export default class Post extends React.Component {
    state = {
        users: [],
        currentUser: [],
        posts: [],
        currentUserPosts: null,
        settings: false
    };

    componentDidMount() {
        const token = localStorage.getItem( 'jwt' )
        axios
            .get(`http://localhost:3000/users` , { headers: { Authorization: token }} )
            .then(res => {
                this.setState({
                    users: res.data.users
                });
                this.findMe()

            })
            .catch(error => console.error(error));


        axios
            .get('http://localhost:3000/posts' , { headers: { Authorization: token } })
            .then(res => {
                const OnlineUser = localStorage.getItem( 'username' )
                const all = res.data
                const collective = []
                for ( var x = 0; x < all.length; x++ ) {
                    if ( all[x].username === OnlineUser ) {
                        collective.push(all[x])
                    }
                }
                this.state.currentUserPosts = { collective }
            })
            .catch(error => console.error(error));
    }

    findMe = () => {
        const OnlineUser = localStorage.getItem( 'username' )
        for ( var x = 0; x < this.state.users.length; x++ ) {
            // console.log( this.state.users[x])
            if ( this.state.users[x].username === OnlineUser ) {
                this.setState({ currentUser: this.state.users[x] })
            }
        }
    }

    logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
    };

    toggleSettings = () => {
        if ( this.state.settings === false ) {
            this.setState({ settings: true })
        } else {
            this.setState({ settings: false })
        }
    }

    render() {
        return (
            <> 
                <div className = 'CurrentUser'>
                    <div className = 'settingsButtonContainer'>
                        <img src = {Settings} className = 'settingsPicture' onClick = {this.toggleSettings}/>
                    </div>
                    <div className = 'profilepicture'>
                        { this.state.currentUser.profileUrl === null ? <img src = "https://www.dts.edu/wp-content/uploads/sites/6/2018/04/Blank-Profile-Picture.jpg" alt = 'profile' classname = "ProfilePicture"/> : ( <img src = {this.state.currentUser.profileUrl} alt = 'profile' classname = "ProfilePicture"/> ) }
                    </div>
                    <div className = 'userInfo'>
                        <p><strong>Username:</strong>   {this.state.currentUser.username}</p>
                        <p><strong>Bio:</strong>   {this.state.currentUser.bio}</p>
                    </div>
                    { this.state.settings === true ? (
                        <div className = 'settingsButtons'>
                            <Link exact to = {`/Edit/${this.state.currentUser.id}`}><button>Edit Profile</button></Link>
                            <Link exact to = '/' onClick = { this.logout }><button>Logout</button></Link>
                        </div>
                    ) : null }
                </div>
            </>
        );
    }
}