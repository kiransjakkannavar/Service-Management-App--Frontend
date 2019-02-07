import React from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import axios from 'axios'
import Vendor from './vendor'

class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dbLocation: [],
            fullname: '',
            email: '',
            password: '',
            confPassword: '',
            mobile: '',
            address: '',
            vendor: '',
            companyName: '',
            service: [],
            location: []
        }
        this.formHandle = this.formHandle.bind(this)
        this.submitHandle = this.submitHandle.bind(this)
        this.serviceData = this.serviceData.bind(this)
        this.locationData = this.locationData.bind(this)
        this.companyData = this.companyData.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:3001/admin/locations').then(response=>{
            this.setState({
                dbLocation: response.data
            })
        })
    }

    formHandle(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    serviceData(ser){
        let arr = []
        ser.map(service =>{
            arr.push(service._id)
        })
         this.setState({
            service: arr
        })
    }
    locationData(loc){
        let arr = []
        loc.map(location =>{
            arr.push(location._id)
        })
        this.setState({
            location: arr
        })
    }
    companyData(company){
        this.setState({
            companyName: company
        })
    }

    submitHandle(e){
        e.preventDefault()
        if(this.state.vendor){
            let vendorDetails = {
                fullname: this.state.fullname,
                email: this.state.email,
                password: this.state.password,
                mobile: this.state.mobile,
                address: this.state.address,
                userlocation: this.state.location,
                role: 'vendor',
                vendor: {
                companyName: this.state.companyName,
                service: this.state.service,
                vendorServiceLocation: this.state.location,
                }
            }
            console.log(vendorDetails)
                
            axios.post('http://localhost:3001/user',vendorDetails).then((response)=>{
            console.log(response.data)
            }).then(err=>{
            console.log(err)
        })
        }
        else {
           let userDetails = {
           fullname: this.state.fullname,
           email: this.state.email,
           password: this.state.password,
           mobile: this.state.mobile,
           address: this.state.address,
           userlocation: this.state.location

        }
           console.log(userDetails)
            
           axios.post('http://localhost:3001/user',userDetails).then((response)=>{
           console.log(response.data)
           }).then(err=>{
           console.log(err)
        })
    }
}
        render(){
            return(
            <div>
                <Form>
                    <Row form>
                    <Col md ={2}>
                        <Label>FullName</Label>
                        <Input type = "text" name ="fullname" value = {this.state.fullname} onChange = {this.formHandle} />{this.state.fullnameError}
                     </Col>
 
                     <Col md ={2}>
                        <Label>Email</Label>
                        <Input type = "text" name = "email" value = {this.state.email} onChange = {this.formHandle}/>
                    </Col>
                    </Row>

                    <Row form>
                    <Col md ={2}>
            
                        <Label>Address</Label>
                        <Input type = "textarea" value = {this.state.address} name = "address" onChange = {this.formHandle}/>
            
                    </Col>

                    <Col md ={2}>
                        <Label>Mobile</Label>
                        <Input type = "number" name = "mobile" value = {this.state.mobile} onChange = {this.formHandle}/>
                     </Col>
                     </Row>
 
                    <Row form>
                    <Col md ={2}>
                        <Label>Password</Label>
                        <Input type = "password" name = "password" value = {this.state.password} onChange = {this.formHandle}/>
                    </Col>

                    <Col md ={2}>
                    <FormGroup>
                        <Label>Confirm password</Label>
                        <Input type = "password" name = "confPassword" value = {this.state.confPassword} onChange = {this.formHandle}/>
                    </FormGroup>
                    </Col>
                    </Row>
                    
                    <Col md ={2}>
                      <FormGroup>
                        <Input type = "select" onChange = {this.formHandle} name = "vendor">
                            <option value= ''>User</option>
                            <option value ="dummy">Service Provider</option>
                        </Input>
                    </FormGroup>
                    </Col>

                    
                    <FormGroup>
                     {this.state.vendor ? <Vendor companyData = {this.companyData} serviceData = {this.serviceData} locationData = {this.locationData}/>: <p></p>}
                    </FormGroup>
                    

                    <Col md ={2}>
                        <FormGroup>
                            <Button onClick = {this.submitHandle}>Sign up</Button>
                        </FormGroup>
                     </Col>
            </Form>
            </div>
        )
    }
}
export default SignUp