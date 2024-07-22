import React, { useState, useEffect } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddTask from './AddTask'
import Search from './Search'
import EditTask from './EditTask'
import ViewTask from './Viewtask'
import '../App.css'

const ItemTypes = {
    TASK: 'task',
};

function TaskList() {
    const [filteredTask, setFilteredTask] = useState([])
    const [tasks, setTasks] = useState([])
    const [selectedTask, setSelectedTask] = useState(null);
    const [viewTask, setViewTask] = useState(null);



    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:7000/tasks');
            const data = await response.json();
            setTasks(data);
            setFilteredTask(data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };
    useEffect(() => {
        fetchTasks();
    }, []);


    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredTask(tasks);
        } else {
            setFilteredTask(tasks.filter(tasks =>
                tasks.title.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
    };


    const handleDelete = async (taskId) => {
        try {
            await fetch(`http://localhost:7000/tasks/${taskId}`, {
                method: 'DELETE'
            });
            setTasks(tasks.filter(task => task._id !== taskId));
            setFilteredTask(filteredTask.filter(task => task._id !== taskId));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
    };

    const handleView = (task) => {
        setViewTask(task);
    };

    const updateTaskStatus = async (task, status) => {
        try {
            await fetch(`http://localhost:7000/tasks/${task._id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...task, status })
            });
            fetchTasks();
        } catch (error) {
            console.error("Failed to update task status:", error);
        }
    };

    const TaskCard = ({ task }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: ItemTypes.TASK,
            item: { task },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));

        return (
            <div ref={drag} className='card' style={{ background: 'var(--bs-primary-bg-subtle)', margin: '20px', opacity: isDragging ? 0.5 : 1 }}>
                <div className='card-body text-start'>
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                    <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
                    <div style={{ position: 'absolute', bottom: '5px', right: '10px' }}>
                        <button className='btn-delete' onClick={() => handleDelete(task._id)}>Delete</button>
                        <button className='btn-edit' onClick={() => handleEdit(task)}>Edit</button>
                        <button className='btn-view' onClick={() => handleView(task)}>View Details</button>
                    </div>
                </div>
            </div>
        );
    };

    const StatusColumn = ({ status, children }) => {
        const [{ canDrop, isOver }, drop] = useDrop(() => ({
            accept: ItemTypes.TASK,
            drop: (item) => updateTaskStatus(item.task, status),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }));

        return (
            <div ref={drop} className='col-md-4 mt-3'>
                <div className='card' style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                    <div className='card-body text-center' style={{ backgroundColor: canDrop && isOver ? '#e0e0e0' : '#fff' }}>
                        <h5 className='text-start' style={{ backgroundColor: '#106EBE', color: 'white', padding: '10px', borderRadius: '5px' }}>{status.toUpperCase()}</h5>
                        {children}
                    </div>
                </div>
            </div>
        );
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <div className='container'>
                <AddTask onTaskAdded={fetchTasks} />
                <Search onSearch={handleSearch} />
                <div className="row" style={{ padding: '30px' }}>
                    <StatusColumn status='To Do'>
                        {filteredTask.filter(task => task.status === 'To Do').map(task => (
                            <TaskCard key={task._id} task={task} />
                        ))}
                    </StatusColumn>
                    <StatusColumn status='In Progress'>
                        {filteredTask.filter(task => task.status === 'In Progress').map(task => (
                            <TaskCard key={task._id} task={task} />
                        ))}
                    </StatusColumn>
                    <StatusColumn status='Done'>
                        {filteredTask.filter(task => task.status === 'Done').map(task => (
                            <TaskCard key={task._id} task={task} />
                        ))}
                    </StatusColumn>
                </div>
                {selectedTask && <EditTask task={selectedTask} onClose={() => { setSelectedTask(null); fetchTasks(); }} />}
                {viewTask && <ViewTask task={viewTask} onClose={() => setViewTask(null)} />}
            </div>
        </DndProvider>
    )
}

export default TaskList
