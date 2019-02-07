import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

class EditLocation extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props.location)
        this.state = {
            locationName: this.props.location.state.name,
            redirect:false
        }
        console.log(this.state.locationName)
    }
    
    handleInputChange = (event)=>{
        console.log(event.target.value );
        this.setState({
            [event.target.name] : event.target.value       
        })
    }

    submitHandle = (event)=>{
        event.preventDefault()
        let id = this.props.location.state.id
        
        const editedData = {
            name: this.state.locationName
        }
        axios.put(`http://localhost:3001/admin/locations/${id}`, editedData).then(response=>{
            this.props.location.edit(response.data)
            this.setState({
                redirect: true
            })
        }).catch(err=>{
            console.log(err)
        })
        
    }

    render(){
        if(this.state.redirect){
            return <Redirect to='/admin/location'/>
        }
        return(
            <div>
                <h2>Edit Location</h2>
                <form onSubmit={this.submitHandle}>
                    <label> Edit Location
                        <input type='text' name='locationName' value={this.state.locationName} onChange={this.handleInputChange} />
                    </label>
                    <input type='submit' value='Update'/>
                </form>
            </div>
        
        
        )
    }
}


export default EditLocation