import Link from "next/link";
import { postsConfig } from "@/lib/posts-config";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string }>;
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

// Get unique categories from static config
function getCategories(): string[] {
  const categories = new Set(postsConfig.map((post) => post.category));
  return Array.from(categories);
}

// Get posts by category from static config
function getPostsByCategoryStatic(category: string) {
  return postsConfig.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({ category: encodeURIComponent(category) }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  return {
    title: `分类: ${decodedCategory}`,
    description: `浏览分类 "${decodedCategory}" 下的文章`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = getPostsByCategoryStatic(decodedCategory);

  if (posts.length === 0 && !getCategories().includes(decodedCategory)) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/categories"
        className="text-[var(--primary)] hover:opacity-70 mb-4 inline-block text-sm"
      >
        ← 所有分类
      </Link>
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
        分类: {decodedCategory}
      </h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">该分类下暂无文章</p>
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
