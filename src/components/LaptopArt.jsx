export default function LaptopArt() {
  return <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100 shadow-[0_28px_60px_rgba(0,0,0,0.38)]">
    <img
      src="/hero-laptop-photo.jpg"
      alt="Dell laptop with a blue Windows display"
      fetchPriority="high"
      className="hero-laptop-float absolute inset-0 z-10 h-full w-full rounded-lg object-contain object-center"
    />
  </div>;
}
