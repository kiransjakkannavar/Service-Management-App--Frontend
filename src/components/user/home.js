import React from 'react'
import axios from 'axios'
import VendorList from './vendorlist'

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            serviceList: [],
            locationList: [],
            selectedService: '',
            selectedLocation: '',
            vendorDetails: '',
            vendorList: false
        }
        this.serviceHandle = this.serviceHandle.bind(this)
        this.locationHandle = this.locationHandle.bind(this)
    }
    componentDidMount(){
        axios.get('http://localhost:3001/service').then(res =>{
            this.setState({
                serviceList: res.data
                
            })
        })

        axios.get('http://localhost:3001/admin/locations').then(res =>{
            this.setState({
                locationList: res.data
            })
        })
    }
    

    locationHandle(e){
        this.setState({
            selectedLocation: e.target.value
        })
    }

    serviceHandle(e){
        this.setState({
            selectedService: e.target.value
        })

        axios.get('http://localhost:3001/user').then(res =>{
            let filteredUser = res.data.filter(user =>{
                return user.role == 'vendor' &&  user.vendor[0].service.includes(this.state.selectedService) && user.vendor[0].vendorServiceLocation.includes(this.state.selectedLocation)
            })
            this.setState({
                vendorDetails: filteredUser,
                vendorList: true
            })
            
        })
        
    }

    render(){
        return (
            <div>
                <select onChange = {this.locationHandle}>
                <option>Select location</option>
                {this.state.locationList.map(loc =>{
                    return <option key = {loc._id} value = {loc._id}>{loc.name}</option>
                })}
                </select>
                &nbsp; &nbsp;
                <select onChange = {this.serviceHandle}>
                    <option>Select service</option>
                    {this.state.serviceList.map((ser)=>{
                    return <option key = {ser._id} value = {ser._id}>{ser.name}</option>
                    })}
                </select><br />
                {this.state.vendorList ? <VendorList vendorDetails = {this.state.vendorDetails}/>: ''}
            </div>
        )
    }

}
export default Home