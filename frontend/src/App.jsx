/**
 * src/App.jsx - Root application component
 * Wraps the entire app in AuthProvider and renders the AppRouter.
 */

import { AuthProvider } from './context/AuthContext';
import AppRouter from './routes/AppRouter';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
