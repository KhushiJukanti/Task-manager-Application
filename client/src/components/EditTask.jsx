import React, { useState } from 'react';

function EditTask({ task, onClose }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);

    const handleSave = async () => {
        try {
            await fetch(`http://localhost:7000/tasks/${task._id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, status })
            });
            onClose()
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    return (
        <div className='modal show d-block'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Edit Task</h5>
                        <button type='button' className='btn-close' onClick={onClose}></button>
                    </div>
                    <div className='modal-body'>
                        <div className='mb-3'>
                            <label className='form-label'>Title</label>
                            <input className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Status</label>
                            <select className='form-select' value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value='To Do'>To Do</option>
                                <option value='In Progress'>In Progress</option>
                                <option value='Done'>Done</option>
                            </select>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={onClose}>Close</button>
                        <button type='button' className='btn btn-primary' onClick={handleSave}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTask;
