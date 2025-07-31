'use client'
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'

/**
 * Navigation component for Star Wars application
 * Provides responsive navigation with mobile hamburger menu
 * @returns {JSX.Element} A responsive navigation component with Star Wars theming
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Handles clicks outside the dropdown to close mobile menu
   * @param {MouseEvent} event - Mouse click event
   * @returns {void}
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-black border-b border-yellow-400">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center py-4">
              <Image 
                src='/images/Star_Wars_Logo.svg.png'
                alt="Star Wars Logo"
                width={120}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex md:justify-end md:flex-row">
            <Link
              href="/characters"
              className="px-4 py-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 rounded-lg ml-4 transition-colors duration-200"
            >
              Characters
            </Link>
            <Link
              href="/starships"
              className="px-4 py-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 rounded-lg ml-4 transition-colors duration-200"
            >
              Starships
            </Link>
            <Link
              href="/planets"
              className="px-4 py-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 rounded-lg ml-4 transition-colors duration-200"
            >
              Planets
            </Link>
            <Link
              href="/films"
              className="px-4 py-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 rounded-lg ml-4 transition-colors duration-200"
            >
              Films
            </Link>
            <Link
              href="/vehicles"
              className="px-4 py-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 rounded-lg ml-4 transition-colors duration-200"
            >
              Vehicles
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-yellow-400 hover:text-yellow-300 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-black border-t border-yellow-400" ref={dropdownRef}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/characters"
              className="block px-3 py-2 text-base font-medium text-yellow-400 hover:text-yellow-300"
              onClick={() => setOpen(false)}
            >
              Characters
            </Link>
            <Link
              href="/starships"
              className="block px-3 py-2 text-base font-medium text-yellow-400 hover:text-yellow-300"
              onClick={() => setOpen(false)}
            >
              Starships
            </Link>
            <Link
              href="/planets"
              className="block px-3 py-2 text-base font-medium text-yellow-400 hover:text-yellow-300"
              onClick={() => setOpen(false)}
            >
              Planets
            </Link>
            <Link
              href="/films"
              className="block px-3 py-2 text-base font-medium text-yellow-400 hover:text-yellow-300"
              onClick={() => setOpen(false)}
            >
              Films
            </Link>
            <Link
              href="/vehicles"
              className="block px-3 py-2 text-base font-medium text-yellow-400 hover:text-yellow-300"
              onClick={() => setOpen(false)}
            >
              Vehicles
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}