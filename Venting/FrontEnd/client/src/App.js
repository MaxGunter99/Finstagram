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
import myAccount from './components/myAccount';
import EditProfile from './components/editProfile'
import EditPost from './components/editPost.js'

import ProfileIcon from './Images/ProfileIcon.png'
import Add from './Images/Add.png'
import Compass from './Images/Compass.png'
import Logo from './Images/Logo.png'

function App() {

  return (
    <div className="App">
      
      { localStorage.getItem( 'jwt' ) ? (
        <nav className = 'NavBar'>
          <div className = 'Logo'>
            <h1>Finstagram</h1>
            <img src = {Logo} alt = 'nav'/>
          </div>
          <div className = 'NavLinks'>
            <NavLink exact to = '/Posts'> <img src = {Compass} alt = 'nav'/> </NavLink>
            <NavLink exact to = '/AddPost'> <img src = {Add} alt = 'nav'/> </NavLink>
            <NavLink exact to = '/MyAccount'> <img src = {ProfileIcon} alt = 'nav'/> </NavLink>
          </div>
        </nav>
      ) : (
        <nav className = 'LoginNavBar'>
            <h1>Finstagram</h1>
            <img src = {Logo} alt = 'nav'/>
        </nav>
      ) }

      <Route exact path = '/' component = { Register } />
      <Route exact path = '/Login' component = { Login } />
      <Route exact path = '/Posts' component = { Posts } />
      <Route exact path = '/Post/:id' component = { Post } />
      <Route exact path = '/AddPost' component = { AddPost } />
      <Route exact path = '/MyAccount' component = { myAccount } />
      <Route exact path = '/Edit/:id' component = { EditProfile } />
      <Route exact path = '/EditPost/:id' component = { EditPost } />

    </div>
  );
}

export default withRouter(App);
