import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth.service';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = async () => {
  try {
    const res = await registerUser({
      username: form.name,
      email: form.email,
      password: form.password,
    });

    // Save JWT + user
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));

    navigate('/add-playlist'); // first-time flow
  } catch (err: any) {
    alert(err.message || 'Registration failed');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <input
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
