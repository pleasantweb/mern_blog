import { Routes,Route } from 'react-router-dom';
import Layout from './hoc/Layout';
import Activation from './pages/auth/Activation';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import NewArticle from './pages/user/NewArticle';
import Profile from './pages/user/Profile';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />

        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/activation' element={<Activation />} />
        <Route path='/auth/login' element={<Login />} />

        <Route path='/profile/:userid' element={<Profile />} />
        <Route path='/newarticle' element={<NewArticle />} />
           
      </Route>
    </Routes>
    
    </>
  );
}

export default App;
