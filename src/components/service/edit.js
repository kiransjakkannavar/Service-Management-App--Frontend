import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

class Edit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            serviceName: this.props.location.state.name,
            serviceDescription: this.props.location.state.category,
            redirect: false
        }
        this.changeText = this.changeText.bind(this)
        this.submitHandle = this.submitHandle.bind(this)
    }
    
    changeText(e){
        this.setState({
            [e.target.name]: e.target.value
            
        })
    }
    
    submitHandle(e){
        e.preventDefault()
        
        const id = this.props.location.state.id
        const putdata = {
            description: this.state.serviceDescription,
            name: this.state.serviceName
        }

        axios.put(`http://localhost:3001/admin/services/${id}`,putdata).then(response =>{   
            this.props.location.editUpdate(response.data)
            this.setState({
                redirect: true
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    render(){
        if(this.state.redirect){
            return <Redirect to="/admin"/>
        }
    return(
        <div>
            <form onSubmit = {this.submitHandle}>
                <h4>Edit service name & categories</h4>
                <label>Service name</label>
                <input type = "text" value = {this.state.serviceName} name = "serviceName" onChange = {this.changeText}/>
                <label>Service description</label>
                <textarea name = "serviceDescription" value = {this.state.serviceDescription} onChange = {this.changeText}></textarea> &nbsp;&nbsp;
                <input type = "submit"/>
            </form>
        </div>
    )
}
}
export default Edit