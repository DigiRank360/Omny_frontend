import { Link } from 'react-router-dom';

export default function Logo({ size = 'text-3xl' }) {
  const imageSize = size.includes('5xl') ? 'h-12 sm:h-14' : size.includes('4xl') ? 'h-10' : 'h-8';

  return <Link to="/" aria-label="OMNYX home" className="inline-flex shrink-0 items-center">
    <img src="/logo.png" alt="OMNYX" className={`${imageSize} w-auto object-contain`} />
  </Link>;
}
