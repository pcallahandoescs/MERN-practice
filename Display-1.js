import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const Display = (props) => {
    const {tvShowList, setTvShowList} = props;
    useEffect(() => {
        axios.get('http://localhost:8000/api/allShows')
            .then((response) => {
                console.log(response);
                setTvShowList(response.data.shows);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    
    const deleteHandler = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8000/api/deleteShofw/${id}`)
            .then ((res) => {
                console.log(res)
                const updatedShowList = tvShowList.filter((show) => show._id !== id)
                setTvShowList(updatedShowList)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
    <div className='d-flex justify-content-between'>
        {
            tvShowList.map((show) => (
                <div key={show._id} className='border border-dark'>
                    <h2>Title: {show.title}</h2>
                    <h2>Network: {show.network}</h2>
                    <h2>Genre: {show.genre}</h2>
                    <Link className='btn btn-secondary' to={`/viewShow/${show._id}`}>View</Link>
                    <br/>
                    <Link className='btn btn-primary' to={`/editShow/${show._id}`}>Edit</Link>
                    <button className='btn btn-danger' onClick={() => deleteHandler(show._id)}>delete</button>
                </div>
            ))
        }
    </div>
    )
}

export default Display