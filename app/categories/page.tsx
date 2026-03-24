import Link from "next/link";
import { postsConfig } from "@/lib/posts-config";

export const metadata = {
  title: "分类",
  description: "按分类浏览文章",
};

export default function CategoriesPage() {
  const categoryMap = new Map<string, number>();
  postsConfig.forEach((post) => {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
  });

  const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
        分类
      </h1>
      {categories.length === 0 ? (
        <p className="text-gray-500">暂无分类</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map(({ name, count }) => (
            <Link
              key={name}
              href={`/categories/${encodeURIComponent(name)}`}
              className="border border-[var(--card-border)] rounded-lg p-6 hover:border-[var(--primary)] transition-colors"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <h2 className="text-xl font-medium mb-2">{name}</h2>
              <p className="text-gray-400 text-sm">{count} 篇文章</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
