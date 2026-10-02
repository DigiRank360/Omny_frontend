import { Link } from 'react-router-dom';
export default function NotFound() {
  return <div className="py-32 text-center"><h1 className="text-4xl font-bold">Page not found</h1><Link to="/" className="btn-primary mt-6">Back to home</Link></div>;
}
