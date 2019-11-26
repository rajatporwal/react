import React, { Component, lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, /* Link , */ NavLink, Redirect, /* Prompt */} from 'react-router-dom';
import Users from './components/ClassComponent';
import './App.css';
import Binding from './components/Binding';
import ComponentPure from './components/PureComponent';
import PropTypesComponent from './components/PropTypes';
import PropTypes from 'prop-types';
import RefsAndDoms from './components/RefsAndDoms';

const LazyComp = lazy(() => import("./components/LazyLoadedComponent"));

// we can use match for fetching data from URL's without even passing it from Component.
const User = ({match}) => {
  return ( <h1> Welcome User {match.params.username} </h1>)
}

// if we passed data as parameter than we will receive it in params
const UserLogin = (params) => {
  return ( <h1> Welcome User {params.username} </h1>)
}

PropTypesComponent.propTypes = {
  str: PropTypes.string,
  bool: PropTypes.bool,
  strOrNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ary: PropTypes.arrayOf([PropTypes.number]),
  aryOfObj: PropTypes.arrayOf(PropTypes.shape(
    {
      name: PropTypes.string,
      age: PropTypes.number
    }
  ))

}

class App extends Component {

  state = {
    loggedIn:false
  }

  loginHandle = () => {
    this.setState(prevState => ({
     loggedIn: !prevState.loggedIn  
    }))
  }
  
  render() {
    return (

      <Router>
        <div className="App">
          <ul>
            <li>
              <NavLink to="/" exact activeStyle={
                { color:'green' }
              }>Home</NavLink>
            </li>
            <li>
              <NavLink to="/users" exact activeStyle={
                { color:'green' }
              }>Users</NavLink>
            </li>
            <li>
              <NavLink to="/binding" exact activeStyle={
                { color:'green' }
              }>Binding</NavLink>
            </li>
            <li>
              <NavLink to="/lazy" exact activeStyle={
                { color:'green' }
              }>Lazy Loading</NavLink>
            </li>
            <li>
              <NavLink to="/pureComponent" exact activeStyle={
                { color:'green' }
              }>Pure Component</NavLink>
            </li>
            <li>
              <NavLink to="/propTypesComponent" exact activeStyle={
                { color:'green' }
              }>Prop Types Component</NavLink>
            </li>
            <li>
              <NavLink to="/refsAndDoms" exact activeStyle={
                { color:'green' }
              }>Ref and DOM Component</NavLink>
            </li>
            <li>
              <NavLink to="/user/john" exact activeStyle={
                { color:'green' }
              }>User John</NavLink>
            </li>
            <li>
              <NavLink to="/user/peter" exact activeStyle={
                { color:'green' }
              }>User Peter</NavLink>
            </li>
          </ul>

          {/* <Prompt
            when={!this.state.loggedIn}
            message={(location)=>{
               return location.pathname.startsWith('/user') ? 'Are you sure?' : true
             }}
          /> */}

          <input type="button" value={this.state.loggedIn ? 'log out': 'log in'} onClick={this.loginHandle.bind(this)}/>
          
          {/* if we do not use exact here than all the pages will run 
          i.e. all the pages with partially matching paths will also run */}

          <Route path="/" exact render= { () => {
              return (
                <h2>Welcome Home.</h2>
              )
            } 
          } />

          <Route path="/users" exact render = { () => {
            return (
              <Users title="Users List"/>
              )
            } 
          }/>

          {/* if we wil not use strict than /binding/ and /binding, 
          in both of these paths <Binding /> component will run. */}

          <Route path="/binding" exact strict component = {Binding}/>

          <Route path="/lazy" exact strict render={ () => (
             <Suspense fallback={<div>Loading.....</div>}>
              <LazyComp />
            </Suspense>
          )}/>

          <Route path="/pureComponent" exact strict component = {ComponentPure}/>

          <Route path="/refsAndDoms" exact strict component = {RefsAndDoms}/>

          <Route path="/propTypesComponent" exact render = { () => {
            return (
              <PropTypesComponent 
                  str="Users List"
                  bool
                  strOrNum = {10}
                  ary = {[10, 20, 30]}
                  aryOfObj = {[{name: "peter", age: 21}, {name: "john", age: 20}]}
                />
              )
            } 
          }/>

          <Route path="/user" exact strict component = {User}/>

          <Route path="/user/:username" exact strict render={({match})=>(
            this.state.loggedIn ? ( <UserLogin username={match.params.username}/>) : (<Redirect to='/' />)
          )}/>

        </div>

      </Router>

    );
  }
}

export default App;