import { Routes,Route } from 'react-router-dom';
import Layout from './hoc/Layout';
import Article from './pages/Article';
import Activation from './pages/auth/Activation';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthorPage from './pages/AuthorPage';
import Home from './pages/Home';
import NewArticle from './pages/user/NewArticle';
import Profile from './pages/user/Profile';
import UpdateArticle from './pages/user/UpdateArticle';

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
        <Route path='/updatearticle/:articleid' element={<UpdateArticle />} />
        <Route path='/:articleId' element={<Article />} />
        <Route path='/author/:authorid' element={<AuthorPage />} />
           
      </Route>
    </Routes>
    
    </>
  );
}

export default App;
