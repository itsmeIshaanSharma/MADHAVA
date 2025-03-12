import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">M.A.D.H.A.V.A.</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/"
              className={`${
                router.pathname === '/' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              } transition`}
            >
              Home
            </Link>
            <Link 
              href="/api-reference"
              className={`${
                router.pathname === '/api-reference' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              } transition`}
            >
              API Reference
            </Link>
            <Link 
              href="/documentation"
              className={`${
                router.pathname === '/documentation' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              } transition`}
            >
              Documentation
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/auth/signin"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Get API Key
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 