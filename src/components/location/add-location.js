import React from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
//   import PlacesAutocomplete from 'react-places-autocomplete';


class AddLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameOfTheLocation: ``,
            nameError: ``,            
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        
    }

    validate = () => {
        let isError = false;
        const errors = {
            nameError: ``            
        }

        if(this.state.nameOfTheLocation.length < 3){
            isError = true;
            errors.nameError = 'name of the location should be atleast 3 characters long';
        }
        this.setState({
            ...this.state,
            ...errors
        })

        return isError;
    }

    handleChangeText(event) {
        event.preventDefault();
        this.setState({
            nameOfTheLocation: event.target.value
        })
    }
    
    handleSubmit(event){
        event.preventDefault();
        const err = this.validate();
        console.log(err,"err");
        if(!err){
            this.setState({
                nameError: ``                
            })
            let submitValue = {
                name: this.state.nameOfTheLocation               
            }
            axios.post('http://localhost:3001/admin/locations', submitValue).then((response) => {
                console.log(submitValue);
                this.setState({
                    redirect: true
                });
            })      
        } 
    }

   
   
    render() {
        //redirecting to locations page after adding a location
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/admin/location/" exact />
        }
        return (
            <div className="row justify-content-md-center">
            <h3>Add Location</h3> 
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label >Location Name</Label>                             
                        <Input type="text" errortext={this.state.nameError} id="name" name="name" onChange={this.handleChangeText} value={this.state.nameOfTheLocation}/><br/>
                        {/* <PlacesAutocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '100px'
                            }}
                            value={ this.state.nameOfTheLocation} onChange={this.handleChangeText}
                        /> */}
                    </FormGroup>
                    {this.state.nameError?<Alert color="primary">{this.state.nameError}</Alert>: ``}
                    <Button type="submit" color="primary" value="submit">Submit</Button><br/><br/>
                    <Link to="/admin/location">back</Link>
                </Form> 
            </div>
        )
        
    }
}

export default AddLocation;