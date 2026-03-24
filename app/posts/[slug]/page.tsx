import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getTagClass(tag: string): string {
  const tagLower = tag.toLowerCase().replace(/\s+/g, '-');
  const tagMap: Record<string, string> = {
    'next.js': 'tag-nextjs',
    'react': 'tag-react',
    'mdx': 'tag-mdx',
    'tailwind-css': 'tag-tailwind',
    'typescript': 'tag-typescript',
    'javascript': 'tag-javascript',
    'css': 'tag-css',
    'html': 'tag-html',
  };
  return tagMap[tagLower] || 'tag-default';
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: encodeURIComponent(post.slug) }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="mb-12">
        <Link
          href="/"
          className="text-[var(--primary)] hover:opacity-70 mb-4 inline-block text-sm"
        >
          ← 返回首页
        </Link>
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
          <span>·</span>
          <Link
            href={`/categories/${encodeURIComponent(post.category)}`}
            className="hover:text-[var(--primary)]"
          >
            {post.category}
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className={`px-2 py-0.5 rounded-full text-xs ${getTagClass(tag)}`}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>
      <div className="prose max-w-none" style={{ color: 'var(--foreground)' }}>
        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
      </div>
    </article>
  );
}
