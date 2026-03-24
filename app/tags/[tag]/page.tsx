import Link from "next/link";
import { postsConfig } from "@/lib/posts-config";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ tag: string }>;
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

// Get unique tags from static config
function getTags(): string[] {
  const tags = new Set(postsConfig.flatMap((post) => post.tags));
  return Array.from(tags);
}

// Get posts by tag from static config
function getPostsByTagStatic(tag: string) {
  return postsConfig.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function generateStaticParams() {
  const tags = getTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `标签: ${decodedTag}`,
    description: `浏览标签 "${decodedTag}" 下的文章`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTagStatic(decodedTag);

  if (posts.length === 0 && !getTags().includes(decodedTag)) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/tags"
        className="text-[var(--primary)] hover:opacity-70 mb-4 inline-block text-sm"
      >
        ← 所有标签
      </Link>
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
        标签: #{decodedTag}
      </h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">该标签下暂无文章</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="animate-fade-in-up border border-[var(--card-border)] rounded-xl p-6 hover:border-[var(--primary)] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms`, backgroundColor: 'var(--card-bg)' }}
            >
              <Link href={`/posts/${encodeURIComponent(post.slug)}/`} className="block">
                <h2 className="text-xl font-medium mb-2 hover:text-[var(--primary)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-3">
                  {post.date}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/categories/${encodeURIComponent(post.category)}`}
                    className="px-2 py-0.5 rounded-full text-xs bg-[var(--card-border)] text-[var(--foreground)]"
                  >
                    {post.category}
                  </Link>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
