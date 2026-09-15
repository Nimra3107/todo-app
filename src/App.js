import './App.css';
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import TodoHome from './TodoHome';
import RegisterForm from './RegisterForm';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import PublicRoute from './PublicRoute.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={
        <PublicRoute>
          <RegisterForm/>
        </PublicRoute>
      }/>
      <Route path='/login' element={
        <PublicRoute>
          <Login/>
        </PublicRoute>
      }/>
      <Route path='/todo' element={
        <ProtectedRoute>
          <TodoHome/>
        </ProtectedRoute>
      }/>
       <Route
                    path="*"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
