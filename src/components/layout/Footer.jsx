import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-serif text-xl font-medium text-ink">
          Social<span className="text-teal">App</span>
        </Link>

        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} SocialApp — built for learning purposes.
        </p>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          <span className="text-xs text-gray-400">Made with React &amp; Tailwind</span>
        </div>
      </div>
    </footer>
  );
}