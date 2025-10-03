// Fichier: /client/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute'; // 1. Importer le garde du corps

function App() {
  return (
    <Routes>
      {/* Routes Publiques */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Routes Protégées */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Vous pourrez ajouter d'autres routes protégées ici plus tard */}
      </Route>
    </Routes>
  );
}

export default App;