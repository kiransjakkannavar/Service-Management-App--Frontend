import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ShowService from './showService'

class ServiceIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            service: []
        }
        this.tableUpdate = this.tableUpdate.bind(this)
        this.deleteUpdate = this.deleteUpdate.bind(this)
        this.editUpdate = this.editUpdate.bind(this)
    }
    
    componentDidMount(){
        axios.get(`http://localhost:3001/admin/services`).then(response =>{
            this.setState({
                service: response.data
            })
        })
    }
  

    tableUpdate(data){
        this.setState(previousState => {
            return {
                service: previousState.service.concat(data)
         }
      })
    }
    
    deleteUpdate(id){
        if(window.confirm('Are you sure you want to delete?')) {
            axios.delete(`http://localhost:3001/admin/services/${id}`).then(()=>{
                this.setState(previousState => {
                    return {
                      service: previousState.service.filter(ser => ser._id !== id )
              }
           })
        })
      }
    }

    editUpdate(data){
        this.state.service.map(ser=>{
            if(ser._id === data._id) {
                return Object.assign(ser, data)
            }
        })
        this.setState({
            service: this.state.service
        })
       
    }

   render(){
       return(
           <div>
               <p><span><Link to= {{
                            pathname: 'admin/add',
                            tableUpdate: this.tableUpdate
                        }}>Add Service</Link></span>&nbsp;&nbsp;
               <span><Link to='/admin/location'>List Locations</Link></span>&nbsp;&nbsp;
               <span><Link to='/admin/location/new'>Add Location</Link></span></p>

               <ShowService data = {this.state.service} editUpdate = {this.editUpdate} tableUpdate = {this.tableUpdate} deleteUpdate = {this.deleteUpdate}/>
           </div>
       )
   } 
}
export default ServiceIndex