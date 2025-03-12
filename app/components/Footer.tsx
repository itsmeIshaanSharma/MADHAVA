import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">M.A.D.H.A.V.A.</h3>
            <p className="text-gray-600">
              Multi-domain Analytical Data Harvesting & Automated Verification Assistant
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/api-reference" className="text-gray-600 hover:text-blue-600">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-gray-600 hover:text-blue-600">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-600 hover:text-blue-600">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 hover:text-blue-600">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <a href="mailto:support@madhava.ai" className="hover:text-blue-600">
                  support@madhava.ai
                </a>
              </li>
              <li className="text-gray-600">
                <a href="tel:+12345678900" className="hover:text-blue-600">
                  +1 234-567-8900
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} M.A.D.H.A.V.A. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 