import React from 'react'
import axios from 'axios'

class AddService extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            serviceName: '',
            serviceDescription: '',
            error: ''
        }
        this.textHandle = this.textHandle.bind(this)
        this.submitHandle = this.submitHandle.bind(this)
    }
    
    textHandle(e){
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }

    submitHandle(e){
        e.preventDefault()
        let postdata = {
            description: this.state.serviceDescription,
            name: this.state.serviceName
        }
        axios.post('http://localhost:3001/service', postdata).then(response =>{
            this.props.location.tableUpdate(response.data.service)
        }).catch(err =>{
            console.log(err)
        })
        e.target.reset()
       
    }

    render(){
        return(
        <div>
            <form onSubmit = {this.submitHandle}>
                <label>Service name</label>
                <input type = "text" name = "serviceName" onChange = {this.textHandle}/>
                <label>Service description</label>
                <textarea type = "text" name = "serviceDescription" onChange = {this.textHandle}></textarea><p>{this.state.error}</p>&nbsp;&nbsp; 
                <input type = "submit"/>
            </form>
        </div>
        )
    }
}
export default AddService
