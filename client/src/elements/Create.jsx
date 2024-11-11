import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'


function Create() {

    const navigate = useNavigate()

    //implementing state management for form values
const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
})

const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('/add_student', values)
    .then((res) => {
        navigate('/')
        console.log(res)
    })
    .catch((err) => console.log(err))
}
  return (
    <div className='container-fluid vh-100 vw-100 bg-primary'>
        <div className="row">
            <h3 className='text-center'>Add Student</h3>
            <div className="d-flex justify-content-end">
                <Link to='/' className='btn btn-success'>Home</Link>
            </div>
            <form className='form' onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label className="form-label" htmlFor="name">Name</label>
                <input type="text" name="name" onChange={(e)=> setValues({...values, name: e.target.value})} className='form-control' />
                </div>
                <div className="form-group my-3">
                    <label className="form-label" htmlFor="email">Email</label>
                <input type="email" name="email" onChange={(e)=> setValues({...values, email: e.target.value})} className='form-control' />
                </div>
                <div className="form-group my-3">
                    <label className="form-label" htmlFor="gender">Gender</label>
                <input type="text" name="gender" onChange={(e)=> setValues({...values, gender: e.target.value})} className='form-control' />
                </div>
                <div className="form-group my-3">
                    <label className="form-label" htmlFor="age">Age</label>
                <input type="text" name="age" onChange={(e)=> setValues({...values, age: e.target.value})} className='form-control' />
                </div>
                <button type="submit" className="btn btn-info">Save</button>
            </form>
        </div>
    </div>
  )
}

export default Create