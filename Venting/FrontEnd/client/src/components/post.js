

import React from "react";
import axios from 'axios';
import '../styles/posts.css'
import Back from '../Images/back.jpg'

import { Link } from 'react-router-dom';

export default class Post extends React.Component {
    state = {
        post: [],
    };

    componentDidMount() {
        const raw = window.location.pathname.toString() 
        const id = raw.replace( '/' , '' ).replace( 'Post' , '' ).replace( '/' , '' )
        const token = localStorage.getItem( 'jwt' )
        axios
            .get(`http://localhost:3000/posts/${id}` , { headers: { Authorization: token }} )
            .then(res => {
                console.log( res.data )
                this.setState({
                    post: res.data
                });
            })
            .catch(error => console.error(error));
    }

    deletePost = () => {
        const raw = window.location.pathname.toString() 
        const id = raw.replace( '/' , '' ).replace( 'Post' , '' ).replace( '/' , '' )
        const token = localStorage.getItem( 'jwt' )
        axios
            .delete(`http://localhost:3000/posts/${id}` , { headers: { Authorization: token }} )
            .then(res => {
                console.log( res.data )
                this.props.history.push( '/Posts' )
            })
            .catch(error => console.error(error));
    }

    render() {
        
        // const scrollToTop = () => {
        //     const c = document.documentElement.scrollTop || document.body.scrollTop;
        //     if (c > 0) {
        //         window.requestAnimationFrame(scrollToTop);
        //         window.scrollTo(0, c - c / 8);
        //     }
        // };

        const OnlineUser = localStorage.getItem( 'username' )

        return (
            <>
                <div className = 'posts'>
                        <div key = {this.state.post.id} className = 'post'>
                            <div>
                                <h4 className = 'username'>{this.state.post.username}</h4>
                                <p className = 'date'>{this.state.post.created_at}</p>
                                <Link to = '/Posts'><img src = {Back} className = 'back'/></Link>
                            </div>
                            { this.state.post.picture === null ?  null : ( <img src = {this.state.post.picture} alt = 'profile' classname = "Picture"/> ) }
                            <p className = 'postContent'>{this.state.post.post}</p>
                            { this.state.post.username === OnlineUser ? ( 
                                <div className = 'options'>
                                    <Link to = {`/EditPost/${this.state.post.id}`}><button>Edit</button> </Link>
                                    <button onClick = { () => this.deletePost() }>Delete</button> 
                                </div>
                            ) : null }
                        </div>
                </div>
            </>
        );
    }
}