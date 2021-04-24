import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/NavBar';
import SignUp from './components/Signup';
import AppHome from './components/Home';
import Login from './components/Login';
import UserHome from './components/UserHome';
import Logout from './components/Logout';
import ViewBookings from './components/ViewBookings';

function App() {
  return (
    <div className="App">
       <Router>
       <CustomNavbar/>
       <Switch>
       <Route exact path='/' component={AppHome} />
       <Route exact path='/register' component={SignUp} />
       <Route exact path='/login' component={Login} />
       <Route exact path='/user' component={UserHome} />
       <Route exact path="/logout" component={Logout} />
       <Route exact path="/viewbooking" component={ViewBookings} />
       </Switch>
         
         
         </Router> 
       
    </div>
  );
}

export default App;
