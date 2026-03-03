import { Routes, Route } from 'react-router-dom';
import LogInPage from '../LogInPage/LogInPage';
import RegisterPage from '../RegisterPage/RegisterPage'
import HomePage from '../HomePage/HomePage'
import ItemList from '../ItemListPage/ItemList'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signIn" element={<LogInPage />} />
      <Route path="/homePage" element={<HomePage />} />
      <Route path="/items" element={<ItemList />} />
    </Routes>
  );
}

export default App;
