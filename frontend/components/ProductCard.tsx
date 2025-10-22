import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  return (
    <div className="group relative flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => onViewDetails(product.id)}>
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-craftmart-100 group-hover:shadow-md transition-all duration-300">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-craftmart-800 group-hover:text-craftmart-900 transition-colors duration-200">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-craftmart-500 group-hover:text-craftmart-600 transition-colors duration-200">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-craftmart-900 group-hover:text-craftmart-950 transition-colors duration-200">${product.price.toFixed(2)}</p>
      </div>
       <div className="mt-2">
          <button 
            onClick={() => onViewDetails(product.id)}
            className="w-full bg-craftmart-700 text-white text-sm font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-craftmart-800 shadow-md hover:shadow-lg"
          >
            View Details
          </button>
        </div>
    </div>
  );
};

export default ProductCard;
