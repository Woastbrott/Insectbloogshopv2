// pages/blog/[slug].js
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function BlogPost({ content, data }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{data.title}</h1>
          <div className="mt-4 text-gray-700">
            {content}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
  const { data, content } = matter(markdownWithMeta);

  return {
    props: {
      data,
      content
    }
  };
}
