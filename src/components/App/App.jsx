import { Routes, Route } from 'react-router-dom';
import LogInPage from '../LogInPage/LogInPage';

function App() {
  return (
    <Routes>
      <Route path="/signIn" element={<LogInPage />} />
    </Routes>
  );
}

export default App;
