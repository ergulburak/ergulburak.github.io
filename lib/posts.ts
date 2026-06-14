import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  slug: string;
  title: {
    tr: string;
    en: string;
  };
  date: string;
  tags: string[];
  readTime: string;
}

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const noOfWords = content.split(/\s/g).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);
  return `${minutes} MIN`;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      const tags = Array.isArray(matterResult.data.tags) 
        ? matterResult.data.tags 
        : (matterResult.data.tags ? String(matterResult.data.tags).split(',').map(t => t.trim()) : []);

      return {
        slug,
        title: {
          tr: matterResult.data.title_tr || matterResult.data.title || slug,
          en: matterResult.data.title_en || matterResult.data.title || slug,
        },
        date: matterResult.data.date ? (matterResult.data.date instanceof Date ? matterResult.data.date.toISOString().split('T')[0] : String(matterResult.data.date)) : '',
        tags,
        readTime: calculateReadTime(matterResult.content),
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const tags = Array.isArray(matterResult.data.tags) 
        ? matterResult.data.tags 
        : (matterResult.data.tags ? String(matterResult.data.tags).split(',').map(t => t.trim()) : []);

  return {
    slug,
    title: {
      tr: matterResult.data.title_tr || matterResult.data.title || slug,
      en: matterResult.data.title_en || matterResult.data.title || slug,
    },
    date: matterResult.data.date ? (matterResult.data.date instanceof Date ? matterResult.data.date.toISOString().split('T')[0] : String(matterResult.data.date)) : '',
    tags,
    readTime: calculateReadTime(matterResult.content),
    content: matterResult.content,
  };
}
