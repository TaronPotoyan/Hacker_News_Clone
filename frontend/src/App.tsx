import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Comments from '../pages/comments'
import Login from '../pages/login'
import User_Page from '../pages/user_page'
import './index.css'
import Create_User from '../pages/CreatUser';
import Newest from '../pages/new'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/CreatUser" element={<Create_User />} />
        <Route path='/story/comm/:id' element={<Comments/>} />
        <Route path='/userpage/' element={<User_Page/>} />
        <Route path='/newest' element={<Newest/>} />
      </Routes>
    </Router>
  );
}

export default App;
