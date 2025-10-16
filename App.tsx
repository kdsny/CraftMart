import React, { useState, useMemo } from 'react';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import Header from './components/Header';
import ProfileModal from './components/ProfileModal';
import AccountPage from './components/AccountPage';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';
import ProductCard from './components/ProductCard';
import ProductDetailPage from './components/ProductDetailPage';
import SellerProfilePage from './components/SellerProfilePage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderTrackingPage from './components/OrderTrackingPage';
import MessagingPage from './components/MessagingPage';
import WishlistPage from './components/WishlistPage';
import NotificationsPage from './components/NotificationsPage';
import SettingsPage from './components/SettingsPage';
import SellerLogin from './components/SellerLogin';
import SellerDashboard from './components/SellerDashboard';
import { Product, Category, Slide, Seller } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'seller' | 'account' | 'cart' | 'checkout' | 'tracking' | 'messages' | 'wishlist' | 'notifications' | 'settings' | 'sellerLogin' | 'sellerDashboard'>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<number | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const slides: Slide[] = [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=600&fit=crop', title: 'Handwoven Wonders', subtitle: 'Discover unique bags and textiles', cta: 'Shop Now' },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=600&fit=crop', title: 'Artisanal Pottery', subtitle: 'Handcrafted ceramics for your home', cta: 'Explore Collection' },
    { id: 3, imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=600&fit=crop', title: 'Sustainable Fashion', subtitle: 'Eco-friendly and stylish apparel', cta: 'View Lookbook' },
  ];

  const categories: Category[] = [
    { id: 1, name: 'Woven Goods', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop' },
    { id: 2, name: 'Pottery', imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop' },
    { id: 3, name: 'Jewelry', imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop' },
    { id: 4, name: 'Home Decor', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop' },
    { id: 5, name: 'Apparel', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop' },
    { id: 6, name: 'Woodcraft', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=500&fit=crop' },
  ];
  
  const sellers: Seller[] = [
    { id: 1, name: 'Elena Petrova', avatarUrl: 'https://i.pravatar.cc/150?u=elena', bio: 'Weaving traditional patterns into modern designs. Based in the mountains, inspired by nature.' },
    { id: 2, name: 'Kenji Tanaka', avatarUrl: 'https://i.pravatar.cc/150?u=kenji', bio: 'Clay artist focusing on minimalist and functional pottery. Each piece is thrown and glazed by hand.' },
    { id: 3, name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/150?u=maria', bio: 'Handcrafting jewelry from recycled silver and ethically sourced gemstones.' },
  ];

  const products: Product[] = [
    { id: 1, name: 'Rattan Weave Tote', price: 45.99, imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', category: 'Woven Goods', sellerId: 1, description: 'A beautifully handwoven tote bag made from sustainable rattan fibers, perfect for summer outings. Features a spacious interior and comfortable leather straps.' },
    { id: 2, name: 'Ceramic Serving Bowl', price: 32.50, imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', category: 'Pottery', sellerId: 2, description: 'A large, rustic ceramic bowl with a unique glaze finish. Ideal for serving salads, pasta, or as a statement centerpiece. Dishwasher and microwave safe.' },
    { id: 3, name: 'Beaded Tassel Earrings', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', category: 'Jewelry', sellerId: 3, description: 'Lightweight and stylish earrings featuring delicate glass beads and soft cotton tassels. Handmade with hypoallergenic hooks.' },
    { id: 4, name: 'Carved Wooden Vase', price: 55.00, imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop', category: 'Home Decor', sellerId: 1, description: 'An intricately carved vase made from reclaimed mahogany wood. Its elegant design adds a touch of natural beauty to any room.' },
    { id: 5, name: 'Linen Summer Scarf', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop', category: 'Apparel', sellerId: 3, description: 'A breathable and soft 100% linen scarf, perfect for cool summer evenings. Hand-dyed with natural plant-based colors.' },
    { id: 6, name: 'Mahogany Coasters (Set of 4)', price: 24.00, imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop', category: 'Woodcraft', sellerId: 1, description: 'Protect your surfaces with this set of four handcrafted mahogany coasters. Each piece showcases the unique grain of the wood and is finished with a water-resistant seal.' },
    { id: 7, name: 'Abaca Fiber Placemats', price: 22.50, imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', category: 'Woven Goods', sellerId: 1, description: 'Set of two eco-friendly placemats woven from durable Abaca fiber. Adds a natural, textural element to your dining table.' },
    { id: 8, name: 'Clay Coffee Mug', price: 20.00, imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', category: 'Pottery', sellerId: 2, description: 'Start your day with a handcrafted clay mug. Its ergonomic handle and earthy texture make for a comforting coffee experience.' },
  ];
  
  const selectedProduct = useMemo(() => products.find(p => p.id === selectedProductId), [selectedProductId, products]);
  const selectedSeller = useMemo(() => sellers.find(s => s.id === selectedSellerId), [selectedSellerId, sellers]);
  const sellerProducts = useMemo(() => products.filter(p => p.sellerId === selectedSellerId), [selectedSellerId, products]);

  const handleViewProduct = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentView('product');
  };

  const handleViewSeller = (sellerId: number) => {
    setSelectedSellerId(sellerId);
    setCurrentView('seller');
  };

  const navigateHome = () => {
    setCurrentView('home');
    setSelectedProductId(null);
    setSelectedSellerId(null);
  };
  const navigateAccount = () => {
    setCurrentView('account');
  };
  const navigateCart = () => setCurrentView('cart');
  const navigateCheckout = () => setCurrentView('checkout');
  const navigateTracking = () => setCurrentView('tracking');
  const navigateMessages = () => setCurrentView('messages');
  const navigateWishlist = () => setCurrentView('wishlist');
  const navigateNotifications = () => setCurrentView('notifications');
  const navigateSettings = () => setCurrentView('settings');
  const navigateSellerLogin = () => setCurrentView('sellerLogin');
  const navigateSellerDashboard = () => setCurrentView('sellerDashboard');
  
  const renderContent = () => {
    switch (currentView) {
      case 'product':
        if (!selectedProduct) return null;
        const productSeller = sellers.find(s => s.id === selectedProduct.sellerId);
        if (!productSeller) return null;
        return <ProductDetailPage product={selectedProduct} seller={productSeller} onBack={navigateHome} onViewSellerProfile={handleViewSeller} />;
      case 'seller':
        if (!selectedSeller) return null;
        return <SellerProfilePage seller={selectedSeller} products={sellerProducts} onBack={navigateHome} onViewProduct={handleViewProduct} />;
      case 'account':
        return <AccountPage onBack={navigateHome} />;
      case 'cart':
        return <CartPage onBack={navigateHome} />;
      case 'checkout':
        return <CheckoutPage onBack={navigateHome} />;
      case 'tracking':
        return <OrderTrackingPage onBack={navigateHome} />;
      case 'messages':
        return <MessagingPage onBack={navigateHome} />;
      case 'wishlist':
        return <WishlistPage onBack={navigateHome} />;
      case 'notifications':
        return <NotificationsPage onBack={navigateHome} />;
      case 'settings':
        return <SettingsPage onBack={navigateHome} />;
      case 'sellerLogin':
        return <SellerLogin onBack={navigateHome} onLoginSuccess={navigateSellerDashboard} />;
      case 'sellerDashboard':
        return <SellerDashboard onLogout={navigateHome} />;
      case 'home':
      default:
        return (
          <>
            <ImageSlider slides={slides} />
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <section id="categories" className="mb-16">
                <h2 className="text-3xl font-bold text-center text-craftmart-800 mb-8">Shop by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                  {categories.map((category) => (
                    <div key={category.id} className="group relative aspect-w-3 aspect-h-4 overflow-hidden rounded-lg cursor-pointer hover:shadow-xl transition-all duration-300">
                      <img src={category.imageUrl} alt={category.name} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-craftmart-500/90 group-hover:via-craftmart-400/50 group-hover:to-transparent">
                        <h3 className="text-white text-lg font-semibold tracking-wider transition-all duration-300 group-hover:text-white">{category.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="new-arrivals" className="mb-16">
                <h2 className="text-3xl font-bold text-center text-craftmart-800 mb-8">New Arrivals</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} onViewDetails={handleViewProduct} />
                  ))}
                </div>
              </section>

              <section id="promo" className="bg-gradient-to-r from-craftmart-200 to-craftmart-300 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between hover:shadow-xl transition-all duration-300">
                <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold text-craftmart-900 mb-2">Support Local Artisans</h2>
                  <p className="text-craftmart-800 mb-4">Every purchase empowers a craftsperson and preserves a tradition. Join our community today.</p>
                  <button className="bg-craftmart-700 text-white font-bold py-3 px-8 rounded-full hover:bg-craftmart-800 transition-all duration-300 shadow-lg hover:shadow-xl">Learn More</button>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-end">
                  <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop" alt="Artisan working" className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"/>
                </div>
              </section>
            </div>
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="bg-[#f8f5f1] text-craftmart-900 font-sans">
        <Header onLogoClick={navigateHome} onProfileClick={navigateAccount} onCartClick={navigateCart} onMessagesClick={navigateMessages} onWishlistClick={navigateWishlist} onNotificationsClick={navigateNotifications} onSettingsClick={navigateSettings} />
        <main>
          {renderContent()}
        </main>
        <Footer onBecomeSeller={navigateSellerLogin} />
        {/* Legacy modal kept for future quick edits */}
        <AuthModal />
      </div>
    </AuthProvider>
  );
};

export default App;