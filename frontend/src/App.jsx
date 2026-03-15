import { Route, Routes } from 'react-router';
import './index.css';
import HomePage from './pages/HomePage';
import NoteDetailPage from './pages/NoteDetailPage';

const App = () => {
  return (
    <div data-theme="nord">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/create" element={<CreatePage />} /> */}
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;

// Get-NetTCPConnection -LocalPort 5001 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }