import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import UserRegistrationForm from './assets/Pages/UserRegistrationFrom.jsx';
import LoginBasic from './assets/Pages/LoginBasic';
import Home from './assets/Pages/Home';
import SuccessPage from './assets/Pages/SuccessPage.jsx';
import ForgotPassPageOne from './assets/Pages/ForgotPassPageOne.jsx';
import Dashboard from './assets/Pages/Darshboard.jsx';
import About from './assets/Pages/About.jsx'
import Header from './assets/components/Header.jsx'
import PasswordSuccessPage from "./assets/Pages/PasswordSuccessPage.jsx";
import Services from "./assets/Pages/Services.jsx";
import Footer from "./assets/components/Footer.jsx"

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path={'/about'} element={<About/>}/>
                <Route path={'/services'} element={<Services/>}/>
                <Route path='/login' element={<LoginBasic/>}/>
                <Route path='/register' element={<UserRegistrationForm/>}/>
                <Route path='/successPage' element={<SuccessPage/>}/>
                <Route path='/passwordsuccess' element={<PasswordSuccessPage/>}/>
                <Route path='/forgotPassword' element={<ForgotPassPageOne/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
