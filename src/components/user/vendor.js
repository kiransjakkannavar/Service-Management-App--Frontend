import React, { Component } from 'react';
import  MultiSelectReact  from 'multi-select-react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import axios from 'axios'

class Vendor extends Component {
    constructor(props) {
        super(props)
        this.state = {
          multiSelect1: [],
          multiSelect2: []
        };
        this.formHandle = this.formHandle.bind(this)
    }

    componentDidMount(){
      axios.get('http://localhost:3001/service').then(res =>{
        let arr = []
        res.data.map(dat =>{
          arr.push({label: dat.name, _id: dat._id, value: false})
        })
        this.setState({
          multiSelect1: arr
        })
        }).catch(err=>{
          console.log(err)
        })

        axios.get('http://localhost:3001/admin/locations').then(res =>{
            let arr = []
            res.data.map(dat =>{
              arr.push({label: dat.name, _id: dat._id, value: false})
            })
            this.setState({
              multiSelect2: arr
            })
            }).catch(err=>{
              console.log(err)
            })
    }


    selectedBadgeClicked(optionsList) {
      this.setState({ multiSelect1: optionsList });
      let ser = optionsList.filter(res => {
        return res.value == true
      })
      console.log(optionsList)
      this.props.serviceData(ser)

    }

    selectedBadgeClicked2(optionsList) {
        this.setState({ multiSelect2: optionsList });
        let loc = optionsList.filter(res => {
          return res.value == true
        })
        this.props.locationData(loc)
  
      }

      formHandle(e){
        this.props.companyData(e.target.value)
      }

  render() {

        const selectedOptionsStyles = {
            color: "#800000",
            backgroundColor: "#dff0d8"
        };
        const optionsListStyles = {
            backgroundColor: "#dff0d8",
            color: "#800000"
        };

    return (
       <div>
      <Col md ={6}>
           <Label>Company Name</Label>
           <Input type = "text" name ="companyName" value = {this.state.companyName} onChange = {this.formHandle} />
      </Col>

      <Col md ={6}>
      <Label>Select your service</Label>
      <MultiSelectReact
      options={this.state.multiSelect1}
      selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
      selectedOptionsStyles={selectedOptionsStyles}
      optionsListStyles={optionsListStyles} />
      </Col>

      <Col md ={6}>
      <Label>Select your service locations</Label>
      <MultiSelectReact
      options={this.state.multiSelect2}
      selectedBadgeClicked={this.selectedBadgeClicked2.bind(this)}
      selectedOptionsStyles={selectedOptionsStyles}
      optionsListStyles={optionsListStyles} />
      </Col>
      </div> 
    )
  }
 
 
 
}
export default Vendor