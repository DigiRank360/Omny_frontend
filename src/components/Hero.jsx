import { useEffect, useState } from 'react';

const INTERVAL_MS = 2000;

export default function Hero() {
  const [banners, setBanners] = useState([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5006/api';
        const backendUrl = apiUrl.replace('/api', '');
        const res = await fetch(`${apiUrl}/store/banners`);
        const data = await res.json();
        
        if (data && data.length > 0) {
          // Filter desktop banners and sort by newest first
          const desktopBanners = data.filter(b => b.type === 'desktop').map(b => ({
            src: b.imageUrl.startsWith('http') ? b.imageUrl : `${backendUrl}${b.imageUrl}`,
            alt: `OMNYX refurbished laptop banner`
          }));
          setBanners(desktopBanners.length > 0 ? desktopBanners : []);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
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

  if (loading || banners.length === 0) {
    return (
      <section id="home" className="relative w-full overflow-hidden bg-navy-950">
        <div className="relative w-full h-[240px] sm:h-[360px] md:h-[560px] lg:h-[560px] xl:h-[859px] bg-gradient-to-r from-navy-900 to-brand-dark" />
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
