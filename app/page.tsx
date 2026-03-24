import Link from "next/link";
import { postsConfig } from "@/lib/posts-config";

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

export default function Home() {
  const posts = [...postsConfig].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
          牛新元的博客
        </h1>
        <p className="text-gray-400">探索技术的无限可能</p>
      </section>

      {posts.length === 0 ? (
        <p className="text-gray-500">暂无文章</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="animate-fade-in-up border border-[var(--card-border)] rounded-xl p-6 hover:border-[var(--primary)] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms`, backgroundColor: 'var(--card-bg)' }}
            >
              <Link href={`/posts/${post.slug}`} className="block">
                <h2 className="text-xl font-medium mb-2 hover:text-[var(--primary)] transition-colors">
                  {post.title}
                </h2>
                <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                  <span>·</span>
                  <Link href={`/categories/${encodeURIComponent(post.category)}`} className="hover:text-[var(--primary)]">
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
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
