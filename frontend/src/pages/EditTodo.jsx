import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// API endpoint
const TODO_API = import.meta.env.VITE_TODOS_API;

const EditTodo = () => {

    const { id } = useParams();
    const nav = useNavigate()
    const [todo, setTodo] = useState([]);

    // Get todo you want to edit
    useEffect(() => {
        axios.get(`${TODO_API}/${id}`)
            .then((res) => {
                setTodo(res.data); // Assuming the response is an object with a 'todo' property
            })
            .catch((err) => alert(err.response.data));
    }, []);

    // Update todo
    const handleUpdate = async () => {
        try {
            await axios.put(`${TODO_API}/${id}`, { todo });
            nav('/'); // Redirect to the home page after successful update
        } catch (error) {
            alert(error.response.data);
        }
    };

    return (
        <div className='container m-auto flex justify-center items-center'>
            <div className=' border flex flex-col justify-center items-center w-[450px] p-2' data-theme='wireframe'>
                <div className='my-3'>
                    <input
                        type="text"
                        name='todo'
                        placeholder='Edit task'
                        onChange={(e) => setTodo(e.target.value)}
                        className='input input-bordered input-success w-full max-w-xs font-semibold rounded-none p-3'
                    />
                </div>
                <div>
                    <button 
                        onClick={handleUpdate}
                        className='btn btn-wide btn-success btn-sm rounded-none text-white'
                        >Save
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default EditTodo;
