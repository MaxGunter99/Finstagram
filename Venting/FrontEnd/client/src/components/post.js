

import React from "react";
import axios from 'axios';
import '../styles/posts.css'
import Back from '../Images/back.jpg'

import { Link } from 'react-router-dom';

export default class Post extends React.Component {
    state = {
        post: [],
        comments: [],
        comment: {
            notes: localStorage.getItem( 'username' ),
            postId: window.location.pathname.toString().replace( '/' , '' ).replace( 'Post' , '' ).replace( '/' , '' ),
            commentDescription: ''
        }
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
        axios
            .get(`http://localhost:3000/posts/${id}/comments` , { headers: { Authorization: token }} )
            .then(res => {
                console.log( 'res.data' , res.data )
                this.setState({
                    comments: res.data
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
                // this.props.history.push( '/Posts' )
            })
            .catch(error => console.error(error));
    }

    changeHandler = event => {
        event.preventDefault();
        this.setState({
            comment: {
                ...this.state.comment,
                [ event.target.name ]: event.target.value
            }
        });
    };

    addComment = event => {
        event.preventDefault();
        const token = localStorage.getItem( 'jwt' )
        axios
            .post(`http://localhost:3000/comments` , this.state.comment , { headers: { Authorization: token }} )
            .then(res => {
                console.log( 'res.data' , res.data )
                this.state.comment.commentDescription = ''
                this.componentDidMount()
            })
            .catch(error => console.error(error));
    }

    deleteComment = ( x ) => {
        console.log( x )
        let info = { commentDescription: x.commentDescription , notes: x.notes , postId: x.postId }
        const token = localStorage.getItem( 'jwt' )
        axios
            .delete(`http://localhost:3000/comments/${x.id}` , info , { headers: { Authorization: token }} )
            .then(res => {
                console.log( 'res.data' , res.data )
                this.componentDidMount()
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
                            { this.state.post.picture === null ?  null : ( <img src = {this.state.post.picture} alt = 'profile' className = "Picture"/> ) }
                            <p className = 'postContent'>{this.state.post.postDescription}</p>
                            { this.state.post.username === OnlineUser ? ( 
                                <div className = 'options'>
                                    <Link to = {`/EditPost/${this.state.post.id}`}><button>Edit</button> </Link>
                                    <button onClick = { () => this.deletePost() }>Delete</button> 
                                </div>
                            ) : null }
                        </div>
                        <div className = 'commentsContainer'>

                            <form onSubmit = { this.addComment } >
                                <input
                                    id = 'commentDescription'
                                    type = 'text'
                                    name = 'commentDescription'
                                    value = { this.state.comment.commentDescription }
                                    placeholder = 'Add Comment'
                                    onChange = { this.changeHandler }
                                />

                                <button type = 'submit' className = 'submitButton' > Done </button>

                            </form>

                            <h4>Comments</h4>
                            { this.state.comments.map((x) =>
                                <div key = {x.id} className = 'individual'> 
                                    <div className = 'commentContent'>
                                        <strong><p className = 'notes'>{x.notes}</p></strong>
                                        <p className = 'comment'>{x.commentDescription}</p>
                                    </div>
                                    <div className = 'deleteButton'>
                                        { x.notes === OnlineUser ? ( <button onClick = { () => this.deleteComment( x ) }>Delete</button> ) : null }
                                    </div>
                                </div>
                            )}
                        </div>
                </div>
            </>
        );
    }
}