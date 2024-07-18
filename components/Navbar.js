// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-white text-2xl font-bold">Hipp-Hoppers</h2>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" legacyBehavior>
              <a className="text-white hover:text-gray-400">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/blog" legacyBehavior>
              <a className="text-white hover:text-gray-400">Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/about" legacyBehavior>
              <a className="text-white hover:text-gray-400">Über uns</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
