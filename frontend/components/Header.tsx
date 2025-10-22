import React from 'react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onLogoClick: () => void;
  onProfileClick: () => void;
  onCartClick?: () => void;
  onMessagesClick?: () => void;
  onWishlistClick?: () => void;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onProfileClick, onCartClick, onMessagesClick, onWishlistClick, onNotificationsClick, onSettingsClick }) => {
  const { requireAuth } = useAuth();
  return (
    <header className="bg-white/95 backdrop-blur-lg sticky top-0 z-50 shadow-sm border-b border-craftmart-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Logo & Main Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button onClick={onLogoClick} className="focus:outline-none transition-opacity duration-200 hover:opacity-80">
                <img src="/logo/CraftMart_logo.png" alt="CraftMart Logo" className="h-12 w-auto" />
              </button>
            </div>
            <nav className="hidden md:flex md:space-x-8 ml-10">
              <button onClick={onLogoClick} className="text-craftmart-700 hover:text-craftmart-900 font-medium transition-colors duration-200 relative group">
                <span>Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-craftmart-500 transition-all duration-200 group-hover:w-full"></span>
              </button>
              <a href="#new-arrivals" className="text-craftmart-700 hover:text-craftmart-900 font-medium transition-colors duration-200 relative group">
                <span>Shop</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-craftmart-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#categories" className="text-craftmart-700 hover:text-craftmart-900 font-medium transition-colors duration-200 relative group">
                <span>Categories</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-craftmart-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-craftmart-700 hover:text-craftmart-900 font-medium transition-colors duration-200 relative group">
                <span>Artisans</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-craftmart-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-craftmart-700 hover:text-craftmart-900 font-medium transition-colors duration-200 relative group">
                <span>About Us</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-craftmart-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
            </nav>
          </div>

          {/* Right Side: Search, Actions, Profile */}
          <div className="flex items-center">
            {/* Communication Icons */}
            <div className="hidden sm:flex items-center space-x-4 text-craftmart-600">
              <button onClick={() => requireAuth(onNotificationsClick)} className="hover:text-craftmart-800 transition-colors duration-200 p-2 rounded-lg hover:bg-craftmart-50" aria-label="Notifications">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button onClick={() => requireAuth(onMessagesClick)} className="hover:text-craftmart-800 transition-colors duration-200 p-2 rounded-lg hover:bg-craftmart-50" aria-label="Messages">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center mx-4">
              <div className="relative">
                <input type="text" placeholder="Search products..." className="px-4 py-2 pl-10 border border-craftmart-200 rounded-full text-sm w-48 focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"/>
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-craftmart-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* User Action Icons */}
            <div className="flex items-center space-x-2 text-craftmart-600 border-l border-craftmart-200 pl-4 ml-2">
              <button onClick={() => requireAuth(onWishlistClick)} className="hover:text-craftmart-800 transition-colors duration-200 p-2 rounded-lg hover:bg-craftmart-50" aria-label="Wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button onClick={() => requireAuth(onCartClick)} className="hover:text-craftmart-800 transition-colors duration-200 p-2 rounded-lg hover:bg-craftmart-50 relative" aria-label="Shopping Cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-craftmart-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium">2</span>
              </button>
              <button onClick={() => requireAuth(onSettingsClick)} className="hover:text-craftmart-800 transition-colors duration-200 p-2 rounded-lg hover:bg-craftmart-50" aria-label="Settings">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.3 1.046a1 1 0 00-2.6 0l-.2 1.2a6.992 6.992 0 00-2.03.84l-1.05-.6a1 1 0 00-1.366.366l-1 1.732a1 1 0 00.366 1.366l1.05.606a6.992 6.992 0 000 2.04l-1.05.606a1 1 0 00-.366 1.366l1 1.732a1 1 0 001.366.366l1.05-.6a6.992 6.992 0 002.03.84l.2 1.2a1 1 0 002.6 0l.2-1.2a6.992 6.992 0 002.03-.84l1.05.6a1 1 0 001.366-.366l1-1.732a1 1 0 00-.366-1.366l-1.05-.606a6.992 6.992 0 000-2.04l1.05-.606a1 1 0 00.366-1.366l-1-1.732a1 1 0 00-1.366-.366l-1.05.6a6.992 6.992 0 00-2.03-.84l-.2-1.2zM10 13a3 3 0 110-6 3 3 0 010 6z" />
                </svg>
              </button>
              <button onClick={() => requireAuth(onProfileClick)} className="hover:text-craftmart-800 transition-colors duration-200 p-2 rounded-lg hover:bg-craftmart-50" aria-label="User Profile">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-4">
              <button className="text-craftmart-600 hover:text-craftmart-800 transition-colors duration-200 p-2 rounded-lg hover:bg-craftmart-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;