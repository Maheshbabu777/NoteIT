import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
import { registerApi, saveTokenToStorage } from "../lib/authApi";

const RegisterPage = () => {

  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error('All fields are required');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setloading(true);

    try {
      const res = await registerApi({ username, email, password });
      saveTokenToStorage(res.token);
      toast.success('Registration successful');
      navigate('/', { replace: true });

    } catch (error) {
      console.error('Registration error:', error);

      toast.error(
        error?.response?.data?.message || error.message || 'Registration failed'
      );

    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-10">
          <img src="/logo.svg" alt="Logo" className="w-12 h-12 mb-10" />
          <span className="text-xl font-semibold mb-10">.IT</span>
        </div>
        <div className="bg-white border border-gray-300 p-8 w-96 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Sign up</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
              <span
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 hover:bg-white hover:text-blue-600 disabled:opacity-50 rounded-lg"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="text-sm">
            Already had an Account? {' '}
            <Link to='/login' className="text-blue-600 hover:underline pt-3 inline-block">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;