import React, { useState } from 'react';
import '../App.css';

function AddTask({onTaskAdded}) {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState('To Do');

    const Addtask = () => {
        setShowForm(true);
    };

    const onTitlechange = (e) => {
        setTitle(e.target.value);
    };

    const onDescChange = (e) => {
        setDescription(e.target.value);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = "Task Name is required.";
        if (!description) newErrors.description = "Task Description is required.";
        return newErrors;
    };

    const saveTask = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            const createdAt = new Date(); // Generate current date and time
            try {
                const response = await fetch("http://localhost:7000/tasks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, description, status })
                });

                const result = await response.json();
                setTitle(" ");
                setDescription(" ");
                setShowAlert(true);
                setStatus('TO DO');
                onTaskAdded();

                if (result.success) {
                    setShowForm(false);                   
                } else {
                    setErrors({ form: result.message });
                }
            } catch (error) {
                setErrors({ form: "Failed to connect to server. Please try again." });
                console.error("Save task error:", error);
            }
        } else {
            setErrors(formErrors);

        }
    };

    const closeForm = () => {
        setShowForm(false);
        // setTitle("");
        // setDescription("");
    };

    return (
        <div className='container task-container'>
            <button className='btn mt-4 button-add-task' onClick={Addtask}>
                Add Task
            </button>

            {showForm && (
                <div className='container'>

                    <div className='card mt-3' style={{ padding: '20px', width: '30%' }}>
                        <div className='body'>
                            <button className='btn btn-third' style={{ float: 'right' }} onClick={closeForm}>Close</button>
                            <form onSubmit={saveTask}>
                                <div className='form-group' style={{ padding: "20px" }}>
                                    <label>Name: </label><br />
                                    <input className='form-control' value={title} onChange={onTitlechange} /><br />
                                </div>
                                <p className='error-text'>{errors?.title}</p>

                                <div className='form-group' style={{ padding: "20px" }}>
                                    <label>Description: </label><br />
                                    <textarea className='form-control' value={description} onChange={onDescChange}></textarea><br />
                                </div>
                                <p className='error-text'>{errors?.description}</p>

                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="To Do">Todo</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>

                                <button style={{ marginLeft: "20px" }} type="submit" className='btn btn-primary'>Save</button>
                                <p className='error-text'>{errors?.form}</p>
                            </form>
                        </div>
                    </div>
                    {showAlert && (
                        <div className="row">
                            <div className="col-md-3 mt-4">
                                <div className="alert alert-success" role="alert">
                                    Task added Successfully!!
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AddTask;
