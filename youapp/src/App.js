import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import RegistrationForm from './Pages/Registration/Registration';
import Admin from './Pages/Admin/Admin';
import NoPage from './Pages/NoPage/NoPage';
import Manage from './Components/Manage List/Manage';
import Userlist from './Components/Userlist/Userlist';
import Edit from './Pages/edit/edit';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="Admin" element={<Admin />}>
          <Route index element={<Userlist />} />
          <Route path="list" element={<Userlist />} />
          <Route path="Manage" element={<Manage />} />
        </Route>
        <Route path="Edit" element={<Edit />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
