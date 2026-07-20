import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';
import Button from '../components/ui/Button';

export default function SignupPage() {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard/posts');
  }, [isAuthenticated, navigate]);

  const password = watch('password');

  function onSubmit(data) {
    try {
      signup({ name: data.name, email: data.email, password: data.password });
      navigate('/login');
    } catch (err) {
      setError('email', { message: err.message });
    }
  }

  // Small reusable field renderer to avoid repeating the same markup 4 times
  function field(name, label, type, validation, placeholder) {
    return (
      <div>
        <label className="text-xs uppercase tracking-wide text-gray-500 block mb-1.5">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full border-0 border-b pb-2 outline-none text-ink bg-transparent focus:border-teal transition-colors ${
            errors[name] ? 'border-coral' : 'border-gray-300'
          }`}
          {...register(name, validation)}
        />
        {errors[name] && (
          <span className="text-xs text-coral mt-1 block">{errors[name].message}</span>
        )}
      </div>
    );
  }

  return (
    <AuthLayout>
      <h2 className="font-serif text-3xl font-medium text-ink">Create your account</h2>
      <p className="text-sm text-gray-500 mt-1 mb-8">
        Join SocialApp and start sharing today.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {field('name', 'Full Name', 'text', {
          required: 'Full name is required',
          minLength: { value: 2, message: 'Name must be at least 2 characters' },
        }, 'John Doe')}

        {field('email', 'Email', 'email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Enter a valid email address',
          },
        }, 'you@example.com')}

        {field('password', 'Password', 'password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Password must be at least 8 characters' },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*\d).+$/,
            message: 'Must contain an uppercase letter and a number',
          },
        }, '••••••••')}

        {field('confirmPassword', 'Confirm Password', 'password', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match',
        }, '••••••••')}

        <Button type="submit" isLoading={isSubmitting} className="mt-3 w-full">
          Sign Up
        </Button>
      </form>

      <p className="text-sm text-gray-500 mt-8">
        Already have an account?{' '}
        <Link to="/login" className="text-teal font-medium hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}