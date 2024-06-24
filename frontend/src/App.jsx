import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Homepage from './components/Homepage'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import Editprofile from './components/Editprofile'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/getUser/:id" element={<Profile />} />
            <Route path="/editprofile/:id" element={<Editprofile />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
