import { Routes, Route, Navigate } from 'react-router-dom'; 
import LogInPage from '../LogInPage/LogInPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import ItemList from '../ItemListPage/ItemList';
import InventoryManagerPage from '../InventoryManagerPage/InventoryManager';
import CreateInvoice from '../CreateInvoice/CreateInvoice';
import ProtectedRoute from '../../ProtectedRoute'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />         
      <Route path="/signIn" element={<LogInPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/homePage" element={<HomePage />} />  
        <Route path="/items" element={<ItemList />} />
        <Route path="/management" element={<InventoryManagerPage />} />
        <Route path="/createInvoice" element={<CreateInvoice />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;