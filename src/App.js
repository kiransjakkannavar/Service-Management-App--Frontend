import React, { Component } from 'react';
import Home from './components/home/index'
import LocationDisplay from './components/location/location-display'
import AddLocation from './components/location/add-location'
//import Geo from './playground/react-geosuggest'
import {BrowserRouter, Route, Link } from 'react-router-dom'



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        
        <Link to='/'>Home</Link><br/>
        <Link to='/admin/location'>Location</Link><br/>
        <Link to='/admin/location/new'>Add Location</Link>
        {/* <Link to='/admin/location/edit/:id'>Edit Location</Link> */}

        <Route path='/' component={Home} exact/>
        <Route path='/admin/location' component={LocationDisplay} exact />
        <Route path='/admin/location/new' component={AddLocation}/>
        
        </div>
      </BrowserRouter>
        
      
      
    );
  }
}

export default App;
