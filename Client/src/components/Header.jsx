import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-blue-600 p-4 text-white">
      <nav className="flex justify-between">
        <Link to="/" className="font-semibold">Home</Link>
        <Link to="/admin" className="font-semibold">Admin</Link>
      </nav>
    </div>
  );
};

export default Header;
