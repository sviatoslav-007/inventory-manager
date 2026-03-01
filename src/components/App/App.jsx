import { Routes, Route } from 'react-router-dom';
import LogInPage from '../LogInPage/LogInPage';
import RegisterPage from '../RegisterPage/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signIn" element={<LogInPage />} />
    </Routes>
  );
}

export default App;
