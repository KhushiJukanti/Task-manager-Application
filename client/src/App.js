import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/taskList" element={<TaskList/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;







