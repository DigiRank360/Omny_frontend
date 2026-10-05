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
  const location = useLocation();

  useEffect(() => {
    const page = document.querySelector('.page-enter');
    if (!page) return undefined;

    const observed = new WeakSet();
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -56px 0px' })
      : null;

    const observePageContent = () => {
      page.querySelectorAll('main, main section, main article, main [data-scroll-card]').forEach(element => {
        if (observed.has(element)) return;
        observed.add(element);

        const siblings = Array.from(element.parentElement.children).filter(sibling => sibling.matches('article, [data-scroll-card]'));
        const index = siblings.indexOf(element);
        if (index >= 0) element.style.setProperty('--scroll-delay', `${Math.min(index, 5) * 60}ms`);
        element.classList.add('scroll-motion');

        if (observer) observer.observe(element);
        else element.classList.add('is-visible');
      });
    };

    observePageContent();
    const mutations = new MutationObserver(observePageContent);
    mutations.observe(page, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutations.disconnect();
    };
  }, [location.pathname]);

  return (<>
    <ScrollToTop />
    <Navbar />
    <div key={location.pathname} className="page-enter">
    <Routes location={location}>
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
    </div>
    <Footer />
  </>);
}
