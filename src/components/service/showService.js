import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

function ShowService(props){
       return(
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Service Description</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                       {props.data.map((service)=>{
                                return(
                                <tr key = {service._id}>
                                {/* <th scope="row">1</th> */}
                                <td>{service.name}</td>
                                <td>{service.description}</td>
                                <td><button><Link to= {{
                                    pathname: 'admin/edit',
                                    state: {
                                      id: service._id,
                                      name: service.name,
                                      category: service.description
                                    },
                                    editUpdate: props.editUpdate
                                }}>Edit</Link></button>
                                <button onClick = {()=>{props.deleteUpdate(service._id)}}>Delete</button></td>
                                </tr>
                                )
                            })}
                    </tbody>
                </Table>
            </div>
        )
    }



export default ShowService