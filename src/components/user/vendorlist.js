import React from 'react'
import axios from 'axios'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, CustomInput} from 'reactstrap';

class VendorList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           vendor: '' 
        }
        this.checkHandle = this.checkHandle.bind(this)
    }
    checkHandle(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div>
                <Form>
                {this.props.vendorDetails.map(vendor =>{
                return <CustomInput id = {vendor._id} onChange = {this.checkHandle} type="radio" name = "vendor" value={vendor._id} 
                label = {
                    <ul>
                    <li>Name: {vendor.fullname}</li>
                    <li>Company: {vendor.vendor[0].companyName}</li>
                    </ul>}
                /> 
                
                
           })}
           </Form>
            </div>

        )
    }

}
export default VendorList
