
import React from "react";
import axios from 'axios';
import '../styles/posts.css';
import { Link } from 'react-router-dom';

import ddd from '../Images/ddd.png'
import Heart from '../Images/Heart.png'
import HeartFull from '../Images/HeartFull.png'
import Comment from '../Images/Comment.png'

export default class Posts extends React.Component {
    state = {
        posts: [],
        like: 'empty',
        like2: 'inactive',
    };

    componentDidMount() {
        const token = localStorage.getItem( 'jwt' )
        axios
            .get('http://localhost:3000/posts' , { headers: { Authorization: token } })
            .then(res => {
                console.log( res.data )
                this.setState({
                    posts: res.data
                });
            })
            .catch(error => console.error(error));
    }

    like = ( e , post ) => {

        e.preventDefault();
        if ( this.state.like === 'empty' ) {

            this.setState({ like: 'full' })
            this.setState({ like2: 'active' })
            
        } 

        if ( this.state.like === 'full' ) {

            this.setState({ like: 'empty' })
            this.setState({ like2: 'inactive' })

        }

        if ( this.state.like === 'empty' ) {

            console.log( 'add' )
            let token = localStorage.getItem( 'token' )
            let like = ( Number(post.likes) + 1 )
            let info = { likes: like , postName: post.postName , postDescription: post.postDescription }
            axios
                .put(`http://localhost:3000/posts/${post.id}` , info , { headers: { Authorization: token }} )
                .then(res => {
                    console.log( res.data )
                    this.props.history.push( `/Posts` )
                    this.componentDidMount()
            })

        } else if ( this.state.like === 'full' ) {
            console.log( 'sub' )
            let token = localStorage.getItem( 'token' )
            let like = ( Number(post.likes) - 1 )
            let info = { likes: like , postName: post.postName , postDescription: post.postDescription }
            axios
                .put(`http://localhost:3000/posts/${post.id}` , info , { headers: { Authorization: token }} )
                .then(res => {
                    console.log( res.data )
                    this.props.history.push( `/Posts` )
                    this.componentDidMount()
            })
        }
    }

    render() {

        return (
            <>
                { this.state.posts.length > 0 ? (
                    <div className = 'posts'>
                        { this.state.posts.map(x => (
                            <div key = {x.id} className = 'post'>
                                <div>
                                    <h4 className = 'username'>{x.username}</h4>
                                    <p className = 'date'>{x.created_at}</p>
                                    <Link to = {`/Post/${x.id}`}><img src = {ddd} className='ddd'/></Link>
                                </div>
                                { x.picture === null ?  null : ( <img src = {x.picture} alt = 'profile' className = "Picture"/> ) }
                                <p className = 'postContent'>{x.postDescription}</p>
                                <p className = 'likeNumber'>
                                    { x.likes === '1' ? ( `${x.likes} like`) : ( `${x.likes} likes`) }
                                </p>
                                <div className = 'actions'>
                                    <img src = { Heart } className = { this.state.like } onClick = {(e) => this.like(e, x)} />
                                    <img src = { HeartFull } className = { this.state.like2 } onClick = {(e) => this.like(e , x)} />
                                    <img src = { Comment } />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className = 'posts'>
                        <p className = 'noPosts' >No Posts</p>
                    </div>
                )}
            </>
        );
    }
}