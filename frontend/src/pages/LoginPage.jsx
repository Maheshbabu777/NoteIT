import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, saveTokenToStorage } from "../lib/authApi";

const LoginPage = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            toast.error('Email and password are required');
            return;
        }

        setloading(true);

        try {
            const res = await loginApi({ email, password });

            const token = res?.token || res?.data?.token;

            if (!token) {
                throw new Error("Token missing");
            }

            saveTokenToStorage(token);

            toast.success('Login successful');
            navigate('/', { replace: true });

        } catch (error) {
            console.error('Login error:', error);

            toast.error(
                error?.response?.data?.message || error.message || 'Login failed'
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
                    <h2 className="text-2xl font-semibold mb-6">Sign in</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 hover:bg-white hover:text-blue-600 disabled:opacity-50 rounded-lg"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="text-sm">
                        Don't have an account? {' '}
                        <Link to='/register' className="text-blue-600 hover:underline pt-3 inline-block">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;