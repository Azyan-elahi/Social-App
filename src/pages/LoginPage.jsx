import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard/posts');
  }, [isAuthenticated, navigate]);

  function onSubmit(data) {
    try {
      login(data.email, data.password);
      navigate('/dashboard/posts');
    } catch (err) {
      setError('password', { message: err.message });
    }
  }

  return (
    <AuthLayout>
      <h2 className="font-serif text-3xl font-medium text-ink">Log in</h2>
      <p className="text-sm text-gray-500 mt-1 mb-8">
        Welcome back — enter your details to continue.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label className="text-xs uppercase tracking-wide text-gray-500 block mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className={`w-full border-0 border-b pb-2 outline-none text-ink bg-transparent focus:border-teal transition-colors ${
              errors.email ? 'border-coral' : 'border-gray-300'
            }`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <span className="text-xs text-coral mt-1 block">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-gray-500 block mb-1.5">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className={`w-full border-0 border-b pb-2 outline-none text-ink bg-transparent focus:border-teal transition-colors ${
              errors.password ? 'border-coral' : 'border-gray-300'
            }`}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />
          {errors.password && (
            <span className="text-xs text-coral mt-1 block">{errors.password.message}</span>
          )}
        </div>

        <Button type="submit" isLoading={isSubmitting} className="mt-3 w-full">
          Log In
        </Button>
      </form>

      <p className="text-sm text-gray-500 mt-8">
        Don't have an account?{' '}
        <Link to="/signup" className="text-teal font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}