import React, {Component} from 'react'
import {BrowserRouter,Link, Route} from 'react-router-dom'

import LocationDisplay from '../location/location-display'
import AddLocation from '../location/add-location'

export default class Admin extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <BrowserRouter>
                <div>
                    <h2> Welcome Admin </h2>
                    <p><span><Link to='/admin/location'>List all Locations</Link></span> &nbsp;&nbsp;&nbsp;<span><Link to='/admin/location/new'> Add Location </Link></span>&nbsp;&nbsp;&nbsp;</p>  
                  
                    <Route path='/admin/location' component={LocationDisplay} exact  />
                    <Route path='/admin/location/new' component={AddLocation} />
                </div>
                
            </BrowserRouter>
        )
    }
}