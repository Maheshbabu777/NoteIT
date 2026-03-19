import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NoteDetailPage from './pages/NoteDetailPage';
import RegisterPage from './pages/RegisterPage';
import { isAuthenticated } from './lib/authApi';

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
};

const App = () => {
  return (
    <>
      <div data-theme="nord">
        <Routes>
          <Route path='/login' 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
          />
          <Route path='/register' 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
          />
          <Route 
          path='/'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          />
          <Route 
          path='/notes/:id'
          element={
            <ProtectedRoute>
              <NoteDetailPage />
            </ProtectedRoute>
          }
          />
          
          <Route path='*' element={<Navigate to='/' />}/>
        </Routes>
      </div>
    </>
  );
};

export default App;

// Get-NetTCPConnection -LocalPort 5001 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }