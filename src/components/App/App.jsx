import { Routes, Route } from 'react-router-dom';
import LogInPage from '../LogInPage/LogInPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import ItemList from '../ItemListPage/ItemList';
import InventoryManagerPage from '../InventoryManagerPage/InventoryManager';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />         
      <Route path="/signIn" element={<LogInPage />} />
      <Route path="/homePage" element={<HomePage />} />  
      <Route path="/items" element={<ItemList />} />
      <Route path="/management" element={<InventoryManagerPage />} />
    </Routes>
  );
}

export default App;