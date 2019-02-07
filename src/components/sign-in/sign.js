import React from 'react'
import axios from 'axios';


export default class SignIn extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }

    inputHandle = (event)=>{
        console.dir(event)
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    submitHandle = (event)=>{
        event.preventDefault()
        let loginData={
            email:this.state.email,
            password:this.state.password
        }
        axios.post('http://localhost3001/user/login', loginData).then(response=>{
            console.log(response.data)
        }).catch(err=>{
            console.log(err)
        })
       
    }

    render(){
       return( <div>
            <div style={{textAlign:"center"}}>
                <h2> Get Instant Access to Reliable Services </h2>
            </div>
            <div style={{textAlign:"center"}}>
            <h3>Log In</h3><br/>
            <form onSubmit={this.submitHandle}>
                <label><b>Email</b>
                    <input type='text' name='email' value={this.state.email} onChange={this.inputHandle}/>
                </label><br/><br/>
                <label><b>Password</b>
                    <input type='password' name='password' value={this.state.password} onChange={this.inputHandle}/>
                </label><br/><br/>
                <input type='submit' value='Log in'/>
            </form>
            </div>
        </div>
       )       
        
    }
}