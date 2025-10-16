import React from 'react';
import { Product, Seller } from '../types';

interface ProductDetailPageProps {
  product: Product;
  seller: Seller;
  onBack: () => void;
  onViewSellerProfile: (sellerId: number) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, seller, onBack, onViewSellerProfile }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={onBack} className="mb-8 text-khaki-brown-700 hover:text-khaki-brown-900 font-medium transition-colors flex items-center">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg"/>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-khaki-brown-900 mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-khaki-brown-700 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-khaki-brown-800 leading-relaxed mb-6">{product.description}</p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <button className="w-full bg-khaki-brown-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-khaki-brown-800 transition-colors duration-300">Add to Cart</button>
            <button className="w-full border-2 border-khaki-brown-700 text-khaki-brown-700 font-bold py-3 px-6 rounded-lg hover:bg-khaki-brown-100 transition-colors duration-300">Add to Wishlist</button>
          </div>
          <button className="w-full bg-khaki-brown-200 text-khaki-brown-800 font-bold py-3 px-6 rounded-lg hover:bg-khaki-brown-300 transition-colors duration-300">Message the Seller</button>
          
          {/* Seller Profile Section */}
          <div className="mt-auto pt-8 border-t border-khaki-brown-200">
            <h3 className="text-lg font-semibold text-khaki-brown-800 mb-4">Meet the Artisan</h3>
            <div className="flex items-center">
              <img src={seller.avatarUrl} alt={seller.name} className="w-16 h-16 rounded-full object-cover mr-4"/>
              <div>
                <p className="font-bold text-khaki-brown-900">{seller.name}</p>
                <button onClick={() => onViewSellerProfile(seller.id)} className="text-sm text-khaki-brown-600 hover:underline">View profile & products</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
