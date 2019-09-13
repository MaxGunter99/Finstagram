// IMPORTS ⬇︎
import React from 'react';
import './styles/general.css'
import './styles/nav.css'
import { Route, NavLink, withRouter } from 'react-router-dom';

import Register from './components/register';
import Login from './components/login';
import Posts from './components/posts';
import Post from './components/post';
import AddPost from './components/addPost';

function App( props ) {

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    props.history.push("/");
  };

  return (
    <div className="App">
      
      { localStorage.getItem( 'jwt' ) ? (
        <nav className = 'NavBar'>
          <NavLink exact to = '/Posts'> Posts </NavLink>
          <NavLink exact to = '/AddPost'> Add Post </NavLink>
          <NavLink exact to = '/MyAccount'> My Account </NavLink>
          <NavLink exact to = '/' onClick = { logout }> LogOut </NavLink>
        </nav>
      ) : (
        <nav className = 'NavBar'>
          <NavLink exact to = '/'> Register </NavLink>
          <NavLink exact to = '/Login' > Login </NavLink>
        </nav>
      ) }

      <Route exact path = '/' component = { Register } />
      <Route exact path = '/Login' component = { Login } />
      <Route exact path = '/Posts' component = { Posts } />
      <Route exact path = '/Post/:id' component = { Post } />
      <Route exact path = '/AddPost' component = { AddPost } />

    </div>
  );
}

export default withRouter(App);
