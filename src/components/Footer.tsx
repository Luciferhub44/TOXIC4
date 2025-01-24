import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-[#FFD513] tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/new" className="text-gray-300 hover:text-[#FFD513]">New Arrivals</Link></li>
              <li><Link to="/collections" className="text-gray-300 hover:text-[#FFD513]">Best Sellers</Link></li>
              <li><Link to="/collections" className="text-gray-300 hover:text-[#FFD513]">Collections</Link></li>
              <li><Link to="/bundles" className="text-gray-300 hover:text-[#FFD513]">Bundles</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#FFD513] tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/support/faq" className="text-gray-300 hover:text-[#FFD513]">FAQ</Link></li>
              <li><Link to="/support/shipping" className="text-gray-300 hover:text-[#FFD513]">Shipping</Link></li>
              <li><Link to="/support/returns" className="text-gray-300 hover:text-[#FFD513]">Returns</Link></li>
              <li><Link to="/support/contact" className="text-gray-300 hover:text-[#FFD513]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#FFD513] tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-gray-300 hover:text-[#FFD513]">About</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-[#FFD513]">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-[#FFD513]">Careers</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-[#FFD513]">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#FFD513] tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/legal/privacy" className="text-gray-300 hover:text-[#FFD513]">Privacy</Link></li>
              <li><Link to="/legal/terms" className="text-gray-300 hover:text-[#FFD513]">Terms</Link></li>
              <li><Link to="/legal/copyright" className="text-gray-300 hover:text-[#FFD513]">Copyright</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-[#FFD513]/20 pt-8">
          <p className="text-center text-gray-400">&copy; 2024 TOXIC Streetwear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;