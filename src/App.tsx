// --- src/App.tsx ---
import { Routes, Route, Navigate } from 'react-router-dom';

import ProfileForm from './components/profileFormPage';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/navBar';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/profile-form" />} />
      <Route path="/profile-form" element={<ProfileForm />} />
      <Route path="/profile-form/:id" element={<ProfileForm />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  </>
);

export default App;
