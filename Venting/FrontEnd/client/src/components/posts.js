
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

    like = event => {
        event.preventDefault();
        if ( this.state.like === 'empty' ) {
            this.setState({ like: 'full' })
            this.setState({ like2: 'active' })
        } 
        if ( this.state.like === 'full' ) {
            this.setState({ like: 'empty' })
            this.setState({ like2: 'inactive' })
        }
        console.log( this.state.like )
    }

    render() {
        
        // const scrollToTop = () => {
        //     const c = document.documentElement.scrollTop || document.body.scrollTop;
        //     if (c > 0) {
        //         window.requestAnimationFrame(scrollToTop);
        //         window.scrollTo(0, c - c / 8);
        //     }
        // };

        return (
            <>
                <div className = 'posts'>
                        { this.state.posts.map(x => (
                            <div key = {x.id} className = 'post'>
                                <div>
                                    <h4 className = 'username'>{x.username}</h4>
                                    <p className = 'date'>{x.created_at}</p>
                                    <Link to = {`/Post/${x.id}`}><img src = {ddd}/></Link>
                                </div>
                                { x.picture === null ?  null : ( <img src = {x.picture} alt = 'profile' classname = "Picture"/> ) }
                                <p className = 'postContent'>{x.post}</p>
                                <div className = 'actions'>
                                    <img src = { Heart } className = { this.state.like } onClick = {this.like} />
                                    <img src = { HeartFull } className = { this.state.like2 } onClick = {this.like} />
                                    <img src = { Comment } />
                                </div>
                            </div>
                        ))}
                </div>
            </>
        );
    }
}