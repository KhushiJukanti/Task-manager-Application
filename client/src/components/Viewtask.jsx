import React from 'react';

function ViewTask({ task, onClose }) {
    return (
        <div className='modal show d-block'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Task Details</h5>
                        <button type='button' className='btn-close' onClick={onClose}></button>
                    </div>
                    <div className='modal-body'>
                        <h4>title : {task.title}</h4>
                        <p>description: {task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewTask;
