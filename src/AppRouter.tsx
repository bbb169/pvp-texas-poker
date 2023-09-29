import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/index.js';
import { PlayRoom } from './pages/playRoom/index.js';


const AppRouter = () => {
    return <Router>
        <Routes>
            <Route path="/" Component={Login} />
            <Route path="playRoom" Component={PlayRoom} />
            <Route Component={Login} />
        </Routes>
    </Router>;
};

export default AppRouter;