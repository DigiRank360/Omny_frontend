import { useEffect, useState } from 'react';
import api, { bannerImageUrl } from '../utils/api';

const INTERVAL_MS = 2000;

export default function Hero() {
  const [banners, setBanners] = useState([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get('/store/banners');
        const data = res.data;
        
        if (data && data.length > 0) {
          // Filter desktop banners and validate URLs
          const desktopBanners = data
            .filter(b => b.type === 'desktop' && b.imageUrl)
            .map(b => ({
              src: bannerImageUrl(b.imageUrl),
              alt: `OMNYX refurbished laptop banner`
            }));
          
          if (desktopBanners.length > 0) {
            setBanners(desktopBanners);
            console.log(`Loaded ${desktopBanners.length} banners from API`);
          } else {
            console.warn('No desktop banners found in API response');
            setBanners([]);
          }
        } else {
          console.warn('No banners returned from API');
          setBanners([]);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (paused || banners.length === 0) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % banners.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, banners]);

  if (loading) {
    // Show loading state
    return (
      <section id="home" className="relative w-full overflow-hidden bg-navy-950">
        <div className="relative w-full h-[240px] sm:h-[360px] md:h-[560px] lg:h-[560px] xl:h-[859px] bg-gradient-to-r from-navy-900 to-brand-dark animate-pulse" />
      </section>
    );
  }

  if (banners.length === 0) {
    // Show fallback when no banners available
    return (
      <section id="home" className="relative w-full overflow-hidden bg-navy-950">
        <div className="relative w-full h-[240px] sm:h-[360px] md:h-[560px] lg:h-[560px] xl:h-[859px] bg-gradient-to-r from-navy-900 to-brand-dark flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-sm opacity-75">Featured banners will appear here soon</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-navy-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full h-[240px] sm:h-[360px] md:h-[560px] lg:h-[560px] xl:h-[859px]">
        {banners.map((b, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={b.src} alt={b.alt} draggable={false} className="h-full w-full select-none object-fill" />
          </div>
        ))}

        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {banners.map((b, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to banner ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === active ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
