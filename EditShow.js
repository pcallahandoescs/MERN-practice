import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const EditShow = (props) => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [show, setShow] = useState({
        title:'',
        releaseYear:1920,
        network:'',
        creator:'',
        genre:''
    })
    const [errors, setErrors] = useState({})
    const changeHandler = (e) => {
        setShow({...show, [e.target.name]:e.target.value})
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/editShow/${id}`)
            .then((res) => {
                console.log(res.data.show);
                setShow(res.data.show)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const submitHandler = (e) => {
            e.preventDefault();
            axios.put(`http://localhost:8000/api/updateShow/${id}`, show)
                .then((res) => {
                    console.log(res)
                    navigate('/')
                })
                .catch((err) => {
                    console.log(err.response.data.errors)
                    setErrors(err.response.data.errors)
                })
        }
    return (
    <div>
        <h2>Edit Show</h2>
        <form onSubmit={submitHandler}>
            <div>
                <label>Title:</label>
                <input type='text' name='title' onChange={changeHandler}/>
                {
                    errors.title?
                    <p className='text-danger'>{errors.title.message}</p>:null
                }
            </div>
            <div>
                <label>Release Year:</label>
                <input type='number' name='releaseYear' onChange={changeHandler}/>
                {
                    errors.releaseYear?
                    <p className='text-danger'>{errors.releaseYear.message}</p>:null
                }
            </div>
            <div>
                <label>Network:</label>
                <input type='text' name='network' onChange={changeHandler}/>
                {
                    errors.network?
                    <p className='text-danger'>{errors.network.message}</p>:null
                }
            </div>
            <div>
                <label>Creator:</label>
                <input type='text' name='creator' onChange={changeHandler}/>
                {
                    errors.creator?
                    <p className='text-danger'>{errors.creator.message}</p>:null
                }
            </div>
            <div>
                <label>Genre:</label>
                <input type='text' name='genre' onChange={changeHandler}/>
                {
                    errors.genre?
                    <p className='text-danger'>{errors.genre.message}</p>:null
                }
            </div>
            <button>Submit</button>
        </form>
    </div>
    )
}


export default EditShow;