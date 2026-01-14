import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth.service';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleLogin = async () => {
  try {
    const res = await loginUser({
      username: form.username,
      password: form.password,
    });

    // Save JWT + user
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));

    navigate('/playlists');
  } catch (err: any) {
    alert(err.message || 'Login failed');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-purple-600 cursor-pointer font-bold"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
