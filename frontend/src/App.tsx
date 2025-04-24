import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Comments from '../pages/comments'
import Login from '../pages/login'

import './index.css'
import Create_User from '../pages/CreatUser';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/CreatUser" element={<Create_User />} />
        <Route path='/story/comm/:id' element={<Comments/>} />
      </Routes>
    </Router>
  );
}

export default App;
