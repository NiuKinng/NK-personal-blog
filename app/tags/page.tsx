import Link from "next/link";
import { postsConfig } from "@/lib/posts-config";

export const metadata = {
  title: "标签",
  description: "按标签浏览文章",
};

export default function TagsPage() {
  const tagMap = new Map<string, number>();
  postsConfig.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  const tags = Array.from(tagMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
        标签
      </h1>
      {tags.length === 0 ? (
        <p className="text-gray-500">暂无标签</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ name, count }) => (
            <Link
              key={name}
              href={`/tags/${encodeURIComponent(name)}`}
              className="inline-flex items-center gap-2 border border-[var(--card-border)] rounded-full px-4 py-2 hover:border-[var(--primary)] transition-colors"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <span className="text-lg text-[var(--primary)]">#</span>
              <span className="font-medium">{name}</span>
              <span className="text-sm text-gray-400">({count})</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
