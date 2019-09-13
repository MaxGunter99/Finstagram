
import React from "react";
import axios from 'axios';
import '../styles/posts.css';
import { Link } from 'react-router-dom';

export default class Posts extends React.Component {
    state = {
        posts: []
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
                <h2> Posts: </h2>
                <div className = 'posts'>
                    {this.state.posts.map(x => (
                        <div key = {x.id} className = 'post'>
                            { x.profileUrl === null ? <img src = "https://www.dts.edu/wp-content/uploads/sites/6/2018/04/Blank-Profile-Picture.jpg" alt = 'profile' classname = "ProfilePicture"/> : ( <img src = {x.profileUrl} alt = 'profile' classname = "ProfilePicture"/> ) }
                            <strong><p className = 'username'>{x.username}</p></strong>
                            <p style = {{ backgroundColor: 'white' , color: 'black' , padding: '10px' }}>{x.post}</p>
                            <p>{x.created_at}</p>
                            <Link to = {`/Post/${x.id}`}>See this post</Link>
                        </div>
                    ))}
                </div>
            </>
        );
    }
}