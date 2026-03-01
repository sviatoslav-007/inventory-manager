import { Routes, Route } from 'react-router-dom';
import LogInPage from '../LogInPage/LogInPage';
import RegisterPage from '../RegisterPage/RegisterPage'
import HomePage from '../HomePage/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signIn" element={<LogInPage />} />
      <Route path="/HomePage" element={<HomePage />} />
    </Routes>
  );
}

export default App;
