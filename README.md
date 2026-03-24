# 个人博客

基于 [Next.js](https://nextjs.org) + [MDX](https://mdxjs.com/) 构建的个人博客系统。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建静态网站（用于部署）
npm run build
```

开发服务器启动后，访问 [http://localhost:3000](http://localhost:3000)。

## 项目结构

```
my-blog/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页
│   ├── layout.tsx        # 布局组件
│   ├── categories/        # 分类页面
│   ├── tags/             # 标签页面
│   └── posts/            # 文章详情页面
├── content/posts/         # MDX 文章存放目录
├── lib/                  # 工具函数
│   └── posts-config.ts   # 文章配置
└── out/                  # 静态导出目录（部署用）
```

## 写作指南

### 添加新文章

1. 在 `content/posts/` 目录下创建 `.mdx` 文件
2. 在 `lib/posts-config.ts` 中添加文章元数据

示例文章格式：

```mdx
---
title: 我的文章标题
date: 2026-03-24
category: 技术
tags: [Next.js, React]
---

# 文章正文

这里是文章内容...
```

### 文章元数据说明

| 字段 | 说明 |
|------|------|
| title | 文章标题 |
| date | 发布日期（YYYY-MM-DD）|
| category | 分类（建议使用中文）|
| tags | 标签数组 |

## 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在 GitHub 仓库设置中启用 Pages（选择 GitHub Actions 作为来源）
3. 每次推送到 main 分支时，会自动构建并部署

或者手动部署：

```bash
npm run build
# 将 out/ 目录下的内容推送到 gh-pages 分支
```

## 技术栈

- **Next.js 14** - React 框架
- **MDX** - Markdown + JSX
- **Tailwind CSS** - 样式
- **GitHub Pages** - 托管
