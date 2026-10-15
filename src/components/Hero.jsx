import { useEffect, useState } from 'react';

const BANNERS = [
  { src: '/banners/banner-1.png', alt: 'Omny X refurbished laptops banner 1' },
  { src: '/banners/banner-2.png', alt: 'Omny X refurbished laptops banner 2' },
];
const INTERVAL_MS = 2000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % BANNERS.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, active]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-navy-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full h-[240px] sm:h-[360px] md:h-[560px] lg:h-[560px] xl:h-[859px]">
        {BANNERS.map((b, i) => (
          <div
            key={b.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={b.src} alt={b.alt} draggable={false} className="h-full w-full select-none object-contain object-center" />
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {BANNERS.map((b, i) => (
            <button
              key={b.src}
              type="button"
              aria-label={`Go to banner ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === active ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
