import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Landing from './pages/Landing';
import Login  from './pages/Login.tsx';
import Register from './pages/Register.tsx';
// import Playlists from './pages/Playlists';
// import AddPlaylist from './pages/AddPlaylist';
// import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/playlists" element={<Playlists />} />
        <Route path="/add-playlist" element={<AddPlaylist />} />
        <Route path="/dashboard/:playlistId" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
