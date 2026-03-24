import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// Try multiple possible locations for the posts directory
function findPostsDirectory(): string {
  const possiblePaths = [
    // During build in .next/server context
    path.join(__dirname, '..', '..', '..', '..', 'content/posts'),
    path.join(__dirname, '..', '..', '..', 'content/posts'),
    path.join(__dirname, '..', '..', 'content/posts'),
    // Project root based paths
    path.join(process.cwd(), 'content/posts'),
    path.join(process.cwd(), '..', 'content/posts'),
    // Absolute path (for development)
    'C:/Users/NxynB/Desktop/新建文件夹/my-blog/content/posts',
  ];

  for (const dir of possiblePaths) {
    if (fs.existsSync(dir)) {
      return dir;
    }
  }

  // Return the default even if not found (will log error later)
  return possiblePaths[3]; // process.cwd() based path
}

const postsDirectory = findPostsDirectory();

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.error(`Posts directory not found. Searched in: ${postsDirectory}`);
      return [];
    }
    return fs.readdirSync(postsDirectory)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const rt = readingTime(content);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      excerpt: content.replace(/[#*`>\n]/g, '').substring(0, 160) + '...',
      readingTime: rt.text,
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const { content, ...meta } = post;
      return meta;
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return posts;
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags);
}
