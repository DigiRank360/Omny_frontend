import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import BecomeDealer from './pages/BecomeDealer';
import DealerPortal from './pages/DealerPortal';
import ProductDetails from './pages/ProductDetails';
import Policies from './pages/Policies';
import NotFound from './pages/NotFound';
import { AboutUs, Products, QualityCheck, Support, WhyOmnyX } from './pages/InformationPages';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (<>
    <ScrollToTop />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/become-a-dealer" element={<BecomeDealer />} />
      <Route path="/why-omnyx" element={<WhyOmnyX />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<ProductDetails />} />
      <Route path="/quality-check" element={<QualityCheck />} />
      <Route path="/support" element={<Support />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/dealer-login" element={<DealerPortal />} />
      <Route path="/privacy-policy" element={<Policies />} />
      <Route path="/terms-and-conditions" element={<Policies />} />
      <Route path="/return-policy" element={<Policies />} />
      <Route path="/shipping-policy" element={<Policies />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </>);
}
