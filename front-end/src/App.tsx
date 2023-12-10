import './css/App.css'
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import SignupForm from './pages/SignupForm'
import Profile from './pages/Profile'
import { Redirect, Route, Switch } from 'wouter'


function App() {
  return (
    <div>
      <Route path="/signup"><SignupForm/></Route>
      <Route path="/psychologists"><Home/></Route>
      <Route path="/profile"><Profile name="John Doe"/></Route>
      <Route path="/login"><LoginForm/></Route>

      <Redirect href='/signup'/>
    </div>
  )
}

export default App
