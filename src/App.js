import React, { Component } from 'react';
import Users from './components/ClassComponent';
import './App.css';
import Binding from './components/Binding';
import ComponentPure from './components/PureComponent';

class App extends Component {

  render() {
    return (
      <div className="App">

        <Users title="Users List"/>

        <Binding />

        <ComponentPure />
        
      </div>
    );
  }
}

export default App;