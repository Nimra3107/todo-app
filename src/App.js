import './App.css';
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import TodoHome from './TodoHome';
import RegisterForm from './RegisterForm';
import Login from './Login.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<RegisterForm/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/todo' element={<TodoHome/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
