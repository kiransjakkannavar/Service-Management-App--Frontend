import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './components/home/index'
import ServiceIndex from './components/service/index'
import LocationDisplay from './components/location/location-display'
import AddLocation from './components/location/add-location'
import EditLocation from './components/location/edit-location'
import Edit from './components/service/edit'
import AddService from './components/service/addService';
import SignUp from './components/user/signup'
// import SignIn from './components/sign-in/sign'


class App extends Component {

  render(){
    return(      
          <BrowserRouter>
          <div>
            <p><span><Link to= '/'>Home</Link></span>&nbsp;&nbsp;
        
            <span><Link to= '/admin'>Admin</Link></span>&nbsp;&nbsp;
            <span><Link to= '/user/signup'>User SignUp</Link></span></p>
            {/* <span><Link to='/login'>Login</Link></span></p> */}

            <Route path='/' component={Home} exact />
            <Route path='/admin' component={ServiceIndex}/>
            <Route path='/admin/edit' component={Edit} exact/>
            <Route path='/admin/add' component={AddService}/>
            <Route path='/admin/location' component={LocationDisplay} exact/>
            <Route path='/admin/location/new' component={AddLocation} exact/>
            <Route path='/admin/location/edit' component={EditLocation} exact/>
            <Route path='/user/signup' component = {SignUp}/>
            {/* <Route path='/login' component={SignIn}/> */}
          </div>  
          </BrowserRouter> 
      
    )
  }
}

export default App;
