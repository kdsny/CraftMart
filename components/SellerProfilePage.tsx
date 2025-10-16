import React from 'react';
import { Seller, Product } from '../types';
import ProductCard from './ProductCard';

interface SellerProfilePageProps {
  seller: Seller;
  products: Product[];
  onBack: () => void;
  onViewProduct: (productId: number) => void;
}

const SellerProfilePage: React.FC<SellerProfilePageProps> = ({ seller, products, onBack, onViewProduct }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <button onClick={onBack} className="mb-8 text-khaki-brown-700 hover:text-khaki-brown-900 font-medium transition-colors flex items-center">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back
      </button>

      {/* Seller Info Header */}
      <div className="flex flex-col md:flex-row items-center bg-khaki-brown-100 p-8 rounded-lg mb-12 shadow">
        <img src={seller.avatarUrl} alt={seller.name} className="w-32 h-32 rounded-full object-cover mb-6 md:mb-0 md:mr-8 border-4 border-khaki-brown-200" />
        <div>
          <h1 className="text-4xl font-bold text-khaki-brown-900 mb-2">{seller.name}</h1>
          <p className="text-khaki-brown-800 leading-relaxed">{seller.bio}</p>
        </div>
      </div>
      
      {/* Seller's Products */}
      <h2 className="text-3xl font-bold text-khaki-brown-800 mb-8">Products by {seller.name}</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onViewDetails={onViewProduct} />
          ))}
        </div>
      ) : (
        <p className="text-center text-khaki-brown-600 py-12">This artisan has not listed any products yet.</p>
      )}
    </div>
  );
};

export default SellerProfilePage;
