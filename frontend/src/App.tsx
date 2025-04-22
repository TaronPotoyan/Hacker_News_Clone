import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Comments from '../pages/comments'
import Login from '../pages/login'
import Forgot from '../pages/forgot'
import './index.css'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/comments" element={<Comments />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/forgot" element={<Forgot />} />
      </Routes>
    </Router>
  );
}

export default App;
