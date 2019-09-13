


import React from "react";
import axios from 'axios';
import '../styles/posts.css'
import { Link } from 'react-router-dom';

export default class Post extends React.Component {
    state = {
        users: [],
        currentUser: [],
        posts: [],
        currentUserPosts: {}
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

    render() {
        return (
            <>
                <div className = 'CurrentUser'>
                    { this.state.currentUser.profileUrl === null ? <img src = "https://www.dts.edu/wp-content/uploads/sites/6/2018/04/Blank-Profile-Picture.jpg" alt = 'profile' classname = "ProfilePicture"/> : ( <img src = {this.state.currentUser.profileUrl} alt = 'profile' classname = "ProfilePicture"/> ) }
                    <p>{this.state.currentUser.username}</p>
                </div>
                { this.state.currentUserPosts === {} ? ( <p>No Posts</p> ) : ( console.log(this.state.currentUserPosts) ) }
            </>
        );
    }
}