import React, { useEffect, useState } from 'react'
import  axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([]) // stores fetch data
    const [deleted, setDeleted] = useState(true)
    //api get and state updating
    useEffect(() => {
        if(deleted){
            setDeleted(false)
        
        axios.get('/students')
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => console.log(err))
    }
    }, [deleted])

    function handleDelete(id){
        axios.delete(`/delete/${id}`)
        .then((res) => {
            setDeleted(true)
        })
        .catch((err) => console.log(err))
    }


  return (
    <div className="container-fluid bg-primary vw-100 vh-100">
        <h3 className="text-center">Students</h3>
        <div className="d-flex justify-content-end">
            <Link to='/create' className="btn btn-success">Add Student</Link>
        </div>
        <table className="table">
            <thead>
                <th>
                    #
                </th>
                <th>
                    Name
                </th>
                <th>
                    Email
                </th>
                <th>
                    Age
                </th>
                <th>
                    Gender
                </th>
            </thead>
            <tbody>
                {
                    data.map((student) => {
                        return(
                            <tr>
                                <td>
                                    {student.id}
                                </td>
                                <td>
                                    {student.name}
                                </td>
                                <td>
                                    {student.email}
                                </td>
                                <td>
                                    {student.age}
                                </td>
                                <td>
                                    {student.gender}
                                </td>
                                <td>
                                    <Link className='text-info' to={`/read/${student.id}`}>Read</Link>
                                </td>
                                <td>
                                    <Link className='text-warning' to={`/edit/${student.id}`}>Edit</Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Home