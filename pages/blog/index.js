// /pages/blog/index.js

import Link from 'next/link';
import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Blog({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Sortiere die Posts alphabetisch nach Titel
  const sortedPosts = posts.sort((a, b) => a.title.localeCompare(b.title));

  // Filtere die Posts basierend auf dem Suchbegriff
  const filteredPosts = sortedPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Blog</h1>
        <div className="relative mb-8 mx-auto w-full max-w-md">
          <input
            type="text"
            placeholder="Suche nach Blog-Posts"
            className="w-full p-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 transition-colors duration-300 ease-in-out"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M15.5 10.5a5 5 0 11-10 0 5 5 0 0110 0z"
            />
          </svg>
        </div>
        <ul className="space-y-4">
          {filteredPosts.map(post => (
            <li key={post.slug} className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105">
              <Link href={`/blog/${post.slug}`} legacyBehavior>
                <a className="text-2xl font-semibold text-black hover:text-indigo-800 no-visited">
                  {post.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data } = matter(markdownWithMeta);

    return {
      slug: filename.replace('.md', ''),
      title: data.title,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
