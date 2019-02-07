import React from 'react'
import axios from 'axios'
import LocationSearchBar from './location-search-bar'
import {Link} from 'react-router-dom'

class LocationDisplay extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            locations: [],
            filteredLocations:[],
            name: ''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/admin/locations').then(response=>
            this.setState({
                locations:response.data,
                filteredLocations: response.data
            })
        )
    }

    handleDelete = (id)=>{
        console.log(id)
        if(window.confirm('Are you sure you want to Delete ?')){
            this.setState(function(prevState){ 
                return {
                    filteredLocations: prevState.locations.filter(location => location._id !== id)
                }           
            })    
            axios.delete(`http://localhost:3001/admin/locations/${id}`).then(response=>{
                console.log('Deleted the location Successfully')
            })
        }        
    }

    searchHandle = (input)=>{
        console.log(input)
        this.setState((prevState)=>{
            return {
              filteredLocations : prevState.locations.filter((location)=>
              (location.name.toLowerCase()).indexOf(input) !== -1)        
            }      
          }) 
    }

    // handleInputChange = (event)=>{
    //     console.log(event.target.value );
    //     this.setState({
    //         [event.target.name] : event.target.value       
    //     })
    // }
    editLocation = (data)=>{ 
        console.log(data)
       let editedData = this.state.filteredLocations.map(location=>{
            if(location._id === data._id){
                Object.assign(location, data)
            }            
        })
        this.setState({
            locations:editedData,
            filteredLocations: editedData
        })
    }

    // handleSubmit = (event)=>{
    //     event.preventDefault()
    //     console.log(event.target.name)
    //     const location = {name: this.state.name}
    //     axios.post(`http://localhost:3001/admin/locations`, location).then(response =>{
    //         let newLocation = response.data
    //         this.setState(function(prevState){
    //             return{
    //                 locations: prevState.locations.concat((newLocation)),
    //                 filteredLocations: prevState.locations.concat((newLocation))
    //             }
    //         })
    //     })
    //     this.setState({ name: '' })
    // }

    render(){
        return(
            <div>
                {/* <h4>Add Location</h4>
                <form onSubmit={this.handleSubmit} >
                    <label> Location
                        <input type='text' name='name' value={this.state.name} onChange={this.handleInputChange}/>
                    </label>
                    <input type='submit' value='Submit'/>
                </form> */}
                <h5> Search Location</h5>
                <LocationSearchBar searchHandle={this.searchHandle}/>
                <h3>Listing Locations- {this.state.filteredLocations.length}</h3>
                <ul>
                {this.state.filteredLocations.map((location)=> <li key={location._id}>{location.name}<button><Link to={{
                    pathname:'location/edit',
                    state:{
                        id:location._id,
                        name:location.name
                    },
                    edit:this.editLocation
                }}>Edit</Link></button><button onClick={()=>this.handleDelete(location._id)}> Delete </button></li>)}
                </ul>
            </div>
        )
    }
}

export default LocationDisplay