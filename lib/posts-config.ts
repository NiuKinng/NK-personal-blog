// Static configuration for posts - used at build time for generateStaticParams
export interface PostConfig {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
}

export const postsConfig: PostConfig[] = [
  {
    slug: 'first-post',
    title: '我的第一篇博客文章',
    date: '2026-03-24',
    category: '技术',
    tags: ['Next.js', 'React', 'MDX'],
    readingTime: '1 分钟',
  },
  {
    slug: 'second-post',
    title: '使用 Tailwind CSS 快速美化界面',
    date: '2026-03-20',
    category: '设计',
    tags: ['Tailwind CSS', '前端', 'CSS'],
    readingTime: '2 分钟',
  },
  {
    slug: 'third-post',
    title: '博客部署到 GitHub Pages 全攻略',
    date: '2026-03-15',
    category: '运维',
    tags: ['GitHub Pages', '部署', 'DevOps'],
    readingTime: '3 分钟',
  },
];
