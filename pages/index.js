// /pages/index.js

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-blue-100 font-hanson">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Hanson&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <h1 className="text-6xl font-extrabold mb-10 text-gray-800">Hipp-Hoppers</h1>
        
        <div className="space-x-4">
          <a href="/blog" className="inline-block bg-black text-white text-2xl px-6 py-3 rounded-full hover:bg-gray-700 transition-colors duration-300">Blog</a>
          <a href="/questions" className="inline-block bg-black text-white text-2xl px-6 py-3 rounded-full hover:bg-gray-700 transition-colors duration-300">Q & A</a>
          <a href="/about" className="inline-block bg-black text-white text-2xl px-6 py-3 rounded-full hover:bg-gray-700 transition-colors duration-300">Über uns</a>
          <a href="/shop" className="inline-block bg-black text-white text-2xl px-6 py-3 rounded-full hover:bg-gray-700 transition-colors duration-300">Shop</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
