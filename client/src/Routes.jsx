import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/signup' element={<Auth><Signup /></Auth>} />
            <Route path='/login' element={<Auth><Login /></Auth>} />
        </Routes>
    );
}