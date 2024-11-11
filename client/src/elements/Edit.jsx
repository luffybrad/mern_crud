
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

function Edit() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        axios.get(`/student/${id}`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()
    
        axios.post(`/edit_student/${id}`, data[0])
        .then((res) => {
            navigate('/')
            console.log(res)
        })
        .catch((err) => console.log(err))
    }
    
  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
        <h1 className='text-center'> User {id} </h1>
        <Link to='/' className='btn btn-success'>Back</Link>
        {data.map((student) => {
            return(
            
                <form className='form' onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label className="form-label" htmlFor="name">Name</label>
                <input value={student.name} type="text" name="name" onChange={(e)=> setData([{...data[0], name: e.target.value}])} className='form-control' />
                </div>
                <div className="form-group my-3">
                    <label className="form-label" htmlFor="email">Email</label>
                <input value={student.email} type="email" name="email" onChange={(e)=> setData([{...data[0], email: e.target.value}])} className='form-control' />
                </div>
                <div className="form-group my-3">
                    <label className="form-label" htmlFor="gender">Gender</label>
                <input value={student.gender} type="text" name="gender" onChange={(e)=> setData([{...data[0], gender: e.target.value}])} className='form-control' />
                </div>
                <div className="form-group my-3">
                    <label className="form-label" htmlFor="age">Age</label>
                <input value={student.age} type="text" name="age" onChange={(e)=> setData([{...data[0], age: e.target.value}])} className='form-control' />
                </div>
                <button type="submit" className="btn btn-info">Save</button>
            </form>

            );
        })}
       
    </div>
  )
}

export default Edit