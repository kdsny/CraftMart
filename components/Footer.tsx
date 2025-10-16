
import React from 'react';

type Props = {
  onBecomeSeller?: () => void;
};

const Footer: React.FC<Props> = ({ onBecomeSeller }) => {
  return (
    <footer className="bg-khaki-brown-800 text-khaki-brown-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">CraftMart</h3>
            <p className="text-sm text-khaki-brown-200">Empowering local artisans and preserving traditional craftsmanship.</p>
            <div className="mt-4">
              <a href="seller/index.html" className="inline-block bg-white text-khaki-brown-900 text-sm font-semibold px-4 py-2 rounded-md hover:bg-khaki-brown-100">Become a Seller</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-khaki-brown-200 hover:text-white text-sm">New Arrivals</a></li>
              <li><a href="#" className="text-khaki-brown-200 hover:text-white text-sm">Best Sellers</a></li>
              <li><a href="#" className="text-khaki-brown-200 hover:text-white text-sm">Categories</a></li>
              <li><a href="#" className="text-khaki-brown-200 hover:text-white text-sm">On Sale</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-khaki-brown-200 hover:text-white text-sm">Contact Us</a></li>
              <li><a href="#" className="text-khaki-brown-200 hover:text-white text-sm">FAQ</a></li>
              <li><a href="#" className="text-khaki-brown-200 hover:text-white text-sm">Shipping & Returns</a></li>
              <li><a href="#" className="text-khaki-brown-200 hover:text-white text-sm">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-khaki-brown-200 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="text-khaki-brown-200 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.343 2.525c.636-.247 1.363-.416 2.427-.465C9.797 2.013 10.15 2 12.315 2zm-1.161 1.545a.96.96 0 100 1.92.96.96 0 000-1.92zm-2.705 4.792a4.41 4.41 0 118.82 0 4.41 4.41 0 01-8.82 0zm5.821 0a1.41 1.41 0 10-2.82 0 1.41 1.41 0 002.82 0z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-khaki-brown-700 pt-8 text-center text-sm text-khaki-brown-300">
          <p>&copy; {new Date().getFullYear()} CraftMart. All Rights Reserved. A Thesis Project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
