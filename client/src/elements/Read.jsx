import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Read() {
    
    const [data, setData] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        axios.get(`/student/${id}`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));
    }, [id])
    
  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
        <h1 className='text-center'> User {id} </h1>
        <Link to='/' className='btn btn-success'>Back</Link>
        {data.map((student) => {
            return(
            
            <ul className="list-group container">
                <li className="list-group-item">
                    <b>ID: </b>
                    {student["id"]}
                </li>
                <li className="list-group-item">
                    <b>Name: </b>
                    {student["name"]}
                </li>
                <li className="list-group-item">
                    <b>Email: </b>
                    {student["email"]}
                </li>
                <li className="list-group-item">
                    <b>Age: </b>
                    {student["age"]}
                </li>
                <li className="list-group-item">
                    <b>Gender: </b>
                    {student["gender"]}
                </li>
            </ul>
            
            );
        })}
       
    </div>
  )
}

export default Read