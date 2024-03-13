import React, { useState, useEffect } from 'react';
import "../index.css";
import Header from './Header';
import Task from "./Task";
const Home = () => {
    const [tasks, setTasks] = useState(localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const submitHandler = ((e) => {

        e.preventDefault();
        setTasks([...tasks, { title, description, }]);
        setTitle(" ");
        setDescription(" ");
        // localStorage.setItem("tasks",JSON.stringify(tasks));
    })

    const deleteTask = (index) => {
        const filteredArr = tasks.filter((val, i) => {
            return i !== index;
        });
        setTasks(filteredArr);
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])


    return (
        <>
            <div className="container">
                <h1>Daily Goals</h1>
                <form onSubmit={submitHandler}>
                    <label style={{fontSize:"2rem",padding:"1px"}}>Enter Title:</label>
                    <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label style={{fontSize:"2rem",padding:"1px"}}>Enter Description:</label>
                    <textarea col='2' rows="3" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <button type='submit'>ADD</button>
                </form>
                {tasks.map((item, index) => (
                    <Task key={index} description={item.description} title={item.title} deleteTask={deleteTask} index={index} />
                ))}
            </div>
        </>
    )
}

export default Home;
